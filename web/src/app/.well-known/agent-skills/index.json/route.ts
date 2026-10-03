import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Digests: sha256 of public/.well-known/agent-skills/<name>/SKILL.md
const INDEX = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: 'zaryadna-site',
      type: 'skill-md',
      description:
        'Accurate ZaryadnaStantsiya site profile, positioning, and llms.txt links for AI citation.',
      url: '/.well-known/agent-skills/zaryadna-site/SKILL.md',
      digest: 'sha256:706729f858c624e92035f8ecd78551b4d3bfc314c35b63f9ff858aa1ef5a4823',
    },
    {
      name: 'zaryadna-categories',
      type: 'skill-md',
      description:
        'Canonical product category URLs: power stations, generators, inverters, calculator, guides, cities.',
      url: '/.well-known/agent-skills/zaryadna-categories/SKILL.md',
      digest: 'sha256:764faa9dd7791d2aa60cec607a0c92213d14a8355b043993e1571636d247c414',
    },
    {
      name: 'zaryadna-contact',
      type: 'skill-md',
      description:
        'How agents and humans contact ZaryadnaStantsiya: claim page, email, and POST /api/claim lead flow.',
      url: '/.well-known/agent-skills/zaryadna-contact/SKILL.md',
      digest: 'sha256:0448dcf32623811c293f2a6c4df5c182b9b743591df5b9c38e56b8e3cbdd8eba',
    },
  ],
} as const;

export async function GET() {
  return NextResponse.json(INDEX, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
