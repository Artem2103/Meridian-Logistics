import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const textNodesRef = useRef(new WeakMap());
  const attrNodesRef = useRef(new WeakMap());

  const toggleLang = () => setLang((l) => (l === "en" ? "ru" : "en"));

  const ruTextMap = useMemo(() => {
    const pairs = new Map();

    const collect = (enNode, ruNode) => {
      if (typeof enNode === "string" && typeof ruNode === "string") {
        pairs.set(enNode, ruNode);
        return;
      }
      if (Array.isArray(enNode) && Array.isArray(ruNode)) {
        enNode.forEach((item, idx) => collect(item, ruNode[idx]));
        return;
      }
      if (enNode && ruNode && typeof enNode === "object" && typeof ruNode === "object") {
        Object.keys(enNode).forEach((key) => collect(enNode[key], ruNode[key]));
      }
    };

    collect(translations.en, translations.ru);
    return pairs;
  }, []);

  const extraRuPhrases = useMemo(
    () =>
      new Map([
        ["One query.", "Один запрос."],
        ["Every answer.", "Все ответы."],
        ["Enter origin, destination, commodity, and volume.", "Введите отправление, назначение, товар и объём."],
        ["Koda returns ranked routes, full landed cost,", "Koda возвращает маршруты по рейтингу, полную итоговую стоимость,"],
        ["and live risk flags in under 3 seconds.", "и флаги рисков в реальном времени менее чем за 3 секунды."],
        ["Explore the platform →", "Изучить платформу →"],
        ["Route Intelligence", "Аналитика маршрутов"],
        ["Business Analytics", "Бизнес-аналитика"],
        ["Risk & Compliance", "Риски и соответствие"],
        ["Learn more", "Узнать больше"],
        ["RANKED ROUTES", "МАРШРУТЫ ПО РЕЙТИНГУ"],
        ["Global Trade Intelligence Platform", "Платформа аналитики мировой торговли"],
        ["Start free trial", "Начать бесплатно"],
        ["See how it works", "Смотреть как это работает"],
        ["MERIDIAN · ROUTE TERMINAL", "MERIDIAN · ТЕРМИНАЛ МАРШРУТОВ"],
        ["SHIPMENT DETAILS", "ДЕТАЛИ ОТПРАВКИ"],
        ["WHAT ARE YOU SHIPPING?", "ЧТО ВЫ ОТПРАВЛЯЕТЕ?"],
        ["QUANTITY", "КОЛИЧЕСТВО"],
        ["ORIGIN COUNTRY", "СТРАНА ОТПРАВЛЕНИЯ"],
        ["DESTINATION COUNTRY", "СТРАНА НАЗНАЧЕНИЯ"],
        ["Select origin…", "Выберите страну отправления…"],
        ["Select destination…", "Выберите страну назначения…"],
        ["Origin and destination must differ.", "Страна отправления и назначения должны отличаться."],
        ["COMPUTING…", "РАСЧЁТ…"],
        ["CALCULATE ROUTES →", "РАССЧИТАТЬ МАРШРУТЫ →"],
        ["HOW THIS WORKS", "КАК ЭТО РАБОТАЕТ"],
        ["Select your goods", "Выберите ваш товар"],
        ["Commodity-specific trade rules are applied for your product category.", "Для вашей категории товара применяются специальные торговые правила."],
        ["Set origin & destination", "Укажите отправление и назначение"],
        ["Country-level restrictions and bans are checked instantly.", "Ограничения и запреты на уровне стран проверяются мгновенно."],
        ["Get real-distance routes", "Получите маршруты с реальной дистанцией"],
        ["Haversine distances via real port hubs produce realistic transit times.", "Дистанции Хаверсина через реальные портовые хабы дают реалистичные сроки транзита."],
        ["Review ranked options", "Просмотрите варианты по рейтингу"],
        ["Routes scored by cost, speed, and compliance burden.", "Маршруты оцениваются по стоимости, скорости и сложности соответствия требованиям."],
        ["ROUTE INTELLIGENCE", "АНАЛИТИКА МАРШРУТОВ"],
        ["ROUTES", "МАРШРУТЫ"],
        ["STATUS", "СТАТУС"],
        ["COMPUTING", "РАСЧЁТ"],
        ["ROUTES READY", "МАРШРУТЫ ГОТОВЫ"],
        ["STANDBY", "ОЖИДАНИЕ"],
        ["LOADING", "ЗАГРУЗКА"],
        ["COMPUTING ROUTES", "ВЫЧИСЛЕНИЕ МАРШРУТОВ"],
        ["TRANSIT", "ТРАНЗИТ"],
        ["VIA", "ЧЕРЕЗ"],
        ["✓ RECOMMENDED", "✓ РЕКОМЕНДОВАНО"],
        ["SELECT CARGO TYPE", "ВЫБЕРИТЕ ТИП ГРУЗА"],
        ["SET ORIGIN & DESTINATION", "УКАЖИТЕ ОТПРАВЛЕНИЕ И НАЗНАЧЕНИЕ"],
        ["RUN ROUTE ANALYSIS", "ЗАПУСТИТЕ АНАЛИЗ МАРШРУТА"],
        ["BEST ROUTE", "ЛУЧШИЙ МАРШРУТ"],
        ["EST. TRANSIT", "ОЦЕНКА ТРАНЗИТА"],
        ["Fresh Produce", "Свежая продукция"],
        ["Electronics", "Электроника"],
        ["Pharmaceuticals", "Фармацевтика"],
        ["Confectionery", "Кондитерские изделия"],
        ["Alcohol & Beverages", "Алкоголь и напитки"],
        ["Textiles & Apparel", "Текстиль и одежда"],
        ["Industrial Chemicals", "Промышленные химикаты"],
        ["Arms & Defence", "Вооружение и оборона"],
        ["Vehicles & Parts", "Транспорт и запчасти"],
        ["Livestock", "Живой скот"],
        ["Timber & Wood", "Древесина и лесоматериалы"],
        ["Minerals & Materials", "Минералы и материалы"],
        ["tonnes", "тонны"],
        ["units", "единицы"],
        ["pallets", "паллеты"],
        ["containers (20ft)", "контейнеры (20 футов)"],
        ["containers (40ft)", "контейнеры (40 футов)"],
        ["litres", "литры"],
      ]),
    []
  );

  useEffect(() => {
    const storedLang = window.localStorage.getItem("koda-language");
    if (storedLang === "ru" || storedLang === "en") setLang(storedLang);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("koda-language", lang);
  }, [lang]);

  useEffect(() => {
    const translateText = (text) => {
      const start = text.match(/^\s*/)?.[0] ?? "";
      const end = text.match(/\s*$/)?.[0] ?? "";
      const core = text.trim();
      if (!core) return text;
      let translatedCore = core;
      if (lang === "ru") {
        translatedCore = ruTextMap.get(core) ?? core;
        if (translatedCore === core) {
          extraRuPhrases.forEach((ruValue, enValue) => {
            if (translatedCore.includes(enValue)) {
              translatedCore = translatedCore.split(enValue).join(ruValue);
            }
          });
        }
      }
      return `${start}${translatedCore}${end}`;
    };

    const applyNodeTranslations = (root = document.body) => {
      if (!root) return;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const original = textNodesRef.current.get(node) ?? node.nodeValue;
        if (!textNodesRef.current.has(node)) textNodesRef.current.set(node, original);
        node.nodeValue = translateText(original);
        node = walker.nextNode();
      }

      const elements = root.querySelectorAll("input[placeholder], textarea[placeholder], [title]");
      elements.forEach((el) => {
        const current = attrNodesRef.current.get(el) ?? {
          placeholder: el.getAttribute("placeholder"),
          title: el.getAttribute("title"),
        };
        if (!attrNodesRef.current.has(el)) attrNodesRef.current.set(el, current);

        if (current.placeholder != null) el.setAttribute("placeholder", translateText(current.placeholder));
        if (current.title != null) el.setAttribute("title", translateText(current.title));
      });
    };

    applyNodeTranslations();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === Node.ELEMENT_NODE) applyNodeTranslations(addedNode);
          if (addedNode.nodeType === Node.TEXT_NODE && addedNode.parentElement) {
            applyNodeTranslations(addedNode.parentElement);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [extraRuPhrases, lang, ruTextMap]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
