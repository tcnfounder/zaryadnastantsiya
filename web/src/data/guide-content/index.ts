import type { Guide } from "../guide-types";
import akumulyator_dlya_invertora from "./akumulyator-dlya-invertora";
import avr_dlya_generatora from "./avr-dlya-generatora";
import benzynovyy_generator from "./benzynovyy-generator";
import dbzh from "./dbzh";
import dbzh_dlya_routera from "./dbzh-dlya-routera";
import dyzelnyy_generator from "./dyzelnyy-generator";
import generator_3_kvt from "./generator-3-kvt";
import generator_dlya_domu from "./generator-dlya-domu";
import hazovyy_generator from "./hazovyy-generator";
import helevyy_akumulyator from "./helevyy-akumulyator";
import hibrydnyy_invertor from "./hibrydnyy-invertor";
import invertor_2_kvt from "./invertor-2-kvt";
import invertor_deye from "./invertor-deye";
import invertor_dlya_domu from "./invertor-dlya-domu";
import invertor_dlya_kotla from "./invertor-dlya-kotla";
import invertor_dlya_kvartyry from "./invertor-dlya-kvartyry";
import invertornyy_generator from "./invertornyy-generator";
import kupyty_generator from "./kupyty-generator";
import kupyty_invertor from "./kupyty-invertor";
import reytynh_zaryadnykh_stantsiy from "./reytynh-zaryadnykh-stantsiy";
import zaryadna_stantsiya_300_vt from "./zaryadna-stantsiya-300-vt";
import zaryadna_stantsiya_dlya_kvartyry from "./zaryadna-stantsiya-dlya-kvartyry";
import zaryadna_stantsiya_z_sonyachnoyu_panellyu from "./zaryadna-stantsiya-z-sonyachnoyu-panellyu";
import zaryadni_stantsii_dlya_domu from "./zaryadni-stantsii-dlya-domu";

/**
 * Long-form rewrites of existing guides (same slug → replaces the thin original)
 * and brand-new guides. One file per guide keeps editorial diffs reviewable.
 */
export const guideOverrides: Guide[] = [
  akumulyator_dlya_invertora,
  benzynovyy_generator,
  dyzelnyy_generator,
  generator_3_kvt,
  generator_dlya_domu,
  hibrydnyy_invertor,
  invertor_2_kvt,
  invertor_deye,
  invertor_dlya_domu,
  invertor_dlya_kotla,
  invertor_dlya_kvartyry,
  invertornyy_generator,
  kupyty_generator,
  kupyty_invertor,
  zaryadna_stantsiya_dlya_kvartyry,
  zaryadni_stantsii_dlya_domu,
];

export const newGuides: Guide[] = [
  avr_dlya_generatora,
  dbzh,
  dbzh_dlya_routera,
  hazovyy_generator,
  helevyy_akumulyator,
  reytynh_zaryadnykh_stantsiy,
  zaryadna_stantsiya_300_vt,
  zaryadna_stantsiya_z_sonyachnoyu_panellyu,
];
