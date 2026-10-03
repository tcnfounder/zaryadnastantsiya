'use client';

import { useEffect } from 'react';

type ToolRegistration = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args?: Record<string, unknown>) => Promise<unknown> | unknown;
};

type ModelContext = {
  registerTool: (
    tool: ToolRegistration,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown> | unknown;
};

function getModelContext(): ModelContext | null {
  if (typeof document !== 'undefined') {
    const docCtx = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (docCtx?.registerTool) return docCtx;
  }
  if (typeof navigator !== 'undefined') {
    const navCtx = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (navCtx?.registerTool) return navCtx;
  }
  return null;
}

/**
 * Registers lightweight WebMCP tools as soon as the browser exposes modelContext.
 * Must run on first paint (not idle-deferred) so agent readiness scanners can detect tools.
 */
export default function WebMcpRegister() {
  useEffect(() => {
    const controller = new AbortController();
    let registered = false;

    const register = async () => {
      if (registered || controller.signal.aborted) return;
      const ctx = getModelContext();
      if (!ctx?.registerTool) return;
      registered = true;

      const tools: ToolRegistration[] = [
        {
          name: 'get_zaryadna_site_info',
          description: 'Return ZaryadnaStantsiya site summary, categories, and key URLs.',
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => {
            const res = await fetch('/mcp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'tools/call',
                params: { name: 'get_site_info', arguments: {} },
              }),
            });
            return res.json();
          },
        },
        {
          name: 'get_zaryadna_contact',
          description: 'Return ZaryadnaStantsiya contact / claim channels.',
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => {
            const res = await fetch('/mcp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'tools/call',
                params: { name: 'get_contact', arguments: {} },
              }),
            });
            return res.json();
          },
        },
        {
          name: 'open_zaryadna_calculator',
          description: 'Navigate the browser to the backup power calculator.',
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => {
            window.location.href = '/kalkulyator';
            return { ok: true, href: '/kalkulyator' };
          },
        },
      ];

      for (const tool of tools) {
        try {
          await ctx.registerTool(tool, { signal: controller.signal });
        } catch {
          // Browser may reject unknown tool shapes; keep trying remaining tools.
        }
      }
    };

    void register();
    const timer = window.setInterval(() => {
      void register();
    }, 500);
    const stop = window.setTimeout(() => window.clearInterval(timer), 8000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  return null;
}
