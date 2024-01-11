import axios from "axios";
import { appConfig } from "../config/appConfig";
import logger from "./logger";
let LANGUAGES = ["en", "ru"];

function getLang(lang?: string) {
  lang = lang?.toLowerCase();
  for (let i = 0; i < LANGUAGES.length; i++) {
    if (LANGUAGES[i] === lang) return lang;
  }
  return "tk";
}

async function syncLanguages() {
  try {
    const path = `${appConfig.gateway}/language-service/languages`;
    const {
      data: { data: actualLanguages },
    } = await axios.get(path);

    const langFromService = [];
    for (const index in actualLanguages) {
      langFromService.push(actualLanguages[index].code);
    }
    LANGUAGES = langFromService;
    logger.info("Languages retrieved");
  } catch (e: any) {
    logger.error(e?.response?.data || `${e}`);
    logger.error("Can't get languages");
  }
}

function getLangs() {
  return LANGUAGES;
}

export { getLang, syncLanguages, getLangs };
