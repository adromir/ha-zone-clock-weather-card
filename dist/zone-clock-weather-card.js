/**
 * Zone Clock & Weather Card for Home Assistant
 * Author: Adromir (https://github.com/adromir)
 * License: MIT
 */

const CARD_VERSION = "1.0.0";

const WEATHER_ICONS = {
  "clear-night": `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  "cloudy": `<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
  "exceptional": `<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  "fog": `<svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M3 16h18M7 20h10M4 8h16"></path></svg>`,
  "hail": `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><circle cx="8" cy="22" r="1"></circle><circle cx="12" cy="22" r="1"></circle><circle cx="16" cy="22" r="1"></circle></svg>`,
  "lightning": `<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  "lightning-rainy": `<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><polygon points="13 14 9 20 12 20 11 24 16 18 13 18 13 14"></polygon></svg>`,
  "partlycloudy": `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path><path d="M18 12h-1.26A6 6 0 1 0 9 18h9a3.5 3.5 0 0 0 0-7z" stroke="#94a3b8"></path></svg>`,
  "pouring": `<svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="20" x2="6" y2="24"></line><line x1="12" y1="20" x2="10" y2="24"></line><line x1="16" y1="20" x2="14" y2="24"></line></svg>`,
  "rainy": `<svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="20" x2="8" y2="23"></line><line x1="12" y1="20" x2="12" y2="23"></line><line x1="16" y1="20" x2="16" y2="23"></line></svg>`,
  "snowy": `<svg viewBox="0 0 24 24" fill="none" stroke="#bae6fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="21" x2="8" y2="21.01"></line><line x1="12" y1="21" x2="12" y2="21.01"></line><line x1="16" y1="21" x2="16" y2="21.01"></line></svg>`,
  "snowy-rainy": `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="21" x2="6" y2="24"></line><line x1="12" y1="21" x2="12" y2="21.01"></line><line x1="16" y1="21" x2="14" y2="24"></line></svg>`,
  "sunny": `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  "windy": `<svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>`,
  "windy-variant": `<svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>`
};

class ZoneClockWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._timer = null;
  }

  static getStubConfig() {
    return {
      title: "Zonen-Uhr & Wetter",
      columns: 2,
      zones: [
        {
          zone: "zone.home",
          name: "Zuhause",
          timezone: "Europe/Berlin",
          weather_entity: "weather.forecast_home",
          show_clock: true,
          show_seconds: false,
          show_forecast: true,
          show_persons: true,
          show_time_diff: true
        },
        {
          zone: "zone.work",
          name: "Büro / New York",
          timezone: "America/New_York",
          weather_entity: "",
          show_clock: true,
          show_seconds: false,
          show_forecast: false,
          show_persons: true,
          show_time_diff: true
        }
      ]
    };
  }

  static async getConfigElement() {
    return document.createElement("zone-clock-weather-card-editor");
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration.");

    let zones = config.zones;
    if (!zones || !Array.isArray(zones)) {
      if (config.zone || config.entity) {
        zones = [config];
      } else {
        zones = [
          {
            zone: "zone.home",
            name: "Zuhause",
            timezone: "auto",
            show_clock: true,
            show_forecast: true,
            show_persons: true,
            show_time_diff: true
          }
        ];
      }
    }

    this._config = {
      title: config.title || "",
      columns: config.columns || 2,
      zones: zones.map(z => ({
        zone: z.zone || z.entity || "",
        name: z.name || "",
        timezone: z.timezone || "auto",
        weather_entity: z.weather_entity || "",
        show_clock: z.show_clock !== false,
        clock_format: z.clock_format || "24h",
        show_seconds: !!z.show_seconds,
        show_forecast: z.show_forecast !== false,
        show_persons: z.show_persons !== false,
        show_time_diff: z.show_time_diff !== false
      }))
    };

    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._updateContent();
  }

  connectedCallback() {
    this._startClockTimer();
  }

  disconnectedCallback() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _startClockTimer() {
    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(() => {
      this._updateClocks();
    }, 1000);
  }

  _getTimeZone(zoneConf) {
    if (zoneConf.timezone && zoneConf.timezone !== "auto") {
      return zoneConf.timezone;
    }
    if (this._hass && this._hass.config && this._hass.config.time_zone) {
      return this._hass.config.time_zone;
    }
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }

  _formatLocalTime(timeZone, showSeconds = false, format12h = false) {
    const now = new Date();
    try {
      const opts = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: format12h
      };
      if (showSeconds) opts.second = "2-digit";
      return new Intl.DateTimeFormat("de-DE", opts).format(now);
    } catch (e) {
      return now.toLocaleTimeString();
    }
  }

  _formatLocalDate(timeZone) {
    const now = new Date();
    try {
      return new Intl.DateTimeFormat("de-DE", {
        timeZone,
        weekday: "short",
        day: "2-digit",
        month: "short"
      }).format(now);
    } catch (e) {
      return now.toLocaleDateString();
    }
  }

  _getTimeDiff(targetTimeZone) {
    try {
      const now = new Date();
      const localTz = (this._hass?.config?.time_zone) || Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (localTz === targetTimeZone) return "Lokale Zeit";

      const localDate = new Date(now.toLocaleString("en-US", { timeZone: localTz }));
      const targetDate = new Date(now.toLocaleString("en-US", { timeZone: targetTimeZone }));
      const diffHours = Math.round((targetDate - localDate) / (1000 * 60 * 60));

      if (diffHours === 0) return "Gleiche Zeit";
      return diffHours > 0 ? `+${diffHours} Std.` : `${diffHours} Std.`;
    } catch (e) {
      return "";
    }
  }

  _getPersonsInZone(zoneConf) {
    if (!this._hass) return [];
    const zoneState = this._hass.states[zoneConf.zone];
    const zoneName = (zoneConf.name || zoneState?.attributes?.friendly_name || "").toLowerCase();
    const zoneId = zoneConf.zone ? zoneConf.zone.replace("zone.", "").toLowerCase() : "";

    const persons = [];
    Object.keys(this._hass.states).forEach(entityId => {
      if (entityId.startsWith("person.")) {
        const p = this._hass.states[entityId];
        const state = (p.state || "").toLowerCase();
        if (state === zoneName || state === zoneId || (zoneId === "home" && state === "home")) {
          persons.push({
            name: p.attributes.friendly_name || entityId.split(".")[1],
            picture: p.attributes.entity_picture
          });
        }
      }
    });
    return persons;
  }

  _render() {
    if (!this._config) return;

    const cols = this._config.columns;
    let gridStyle = "repeat(auto-fit, minmax(280px, 1fr))";
    if (cols === 1) gridStyle = "1fr";
    else if (cols === 2) gridStyle = "repeat(auto-fit, minmax(280px, 1fr))";
    else if (cols === 3) gridStyle = "repeat(auto-fit, minmax(220px, 1fr))";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          background: var(--ha-card-background, var(--card-background-color, #ffffff));
          border-radius: var(--ha-card-border-radius, 16px);
          border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(125, 125, 125, 0.15));
          color: var(--primary-text-color, #1e293b);
          box-sizing: border-box;
        }
        .card-header {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--primary-text-color, #1e293b);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .zones-grid {
          display: grid;
          grid-template-columns: ${gridStyle};
          gap: 16px;
        }
        .zone-tile {
          background: var(--secondary-background-color, rgba(125, 125, 125, 0.05));
          border: 1px solid var(--ha-card-border-color, rgba(125, 125, 125, 0.12));
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .zone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .zone-title {
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-text-color, #0f172a);
        }
        .zone-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 10px;
          background: var(--ha-card-border-color, rgba(125, 125, 125, 0.15));
          color: var(--secondary-text-color, #64748b);
        }
        .clock-section {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid var(--ha-card-border-color, rgba(125, 125, 125, 0.1));
          padding-bottom: 10px;
        }
        .digital-clock {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1;
          color: var(--primary-text-color, #0f172a);
        }
        .date-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--secondary-text-color, #64748b);
        }
        .weather-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .weather-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
        }
        .weather-temp {
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1;
        }
        .weather-state {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--secondary-text-color, #64748b);
          text-transform: capitalize;
        }
        .weather-meta {
          display: flex;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--secondary-text-color, #64748b);
          margin-top: 4px;
        }
        .persons-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .person-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px 3px 4px;
          border-radius: 12px;
          background: var(--ha-card-background, #ffffff);
          border: 1px solid var(--ha-card-border-color, rgba(125, 125, 125, 0.2));
          font-size: 0.75rem;
          font-weight: 600;
        }
        .person-avatar {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          object-fit: cover;
          background: #3b82f6;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
        }
      </style>

      <ha-card>
        ${this._config.title ? `<div class="card-header">${this._config.title}</div>` : ""}
        <div class="zones-grid" id="zones-grid"></div>
      </ha-card>
    `;

    this._renderZoneTiles();
  }

  _renderZoneTiles() {
    const grid = this.shadowRoot.getElementById("zones-grid");
    if (!grid) return;
    grid.innerHTML = "";

    this._config.zones.forEach((zoneConf, idx) => {
      const tile = document.createElement("div");
      tile.className = "zone-tile";
      tile.id = `zone-tile-${idx}`;

      const name = zoneConf.name || (this._hass?.states[zoneConf.zone]?.attributes?.friendly_name || zoneConf.zone || "Zone");
      const tz = this._getTimeZone(zoneConf);
      const diff = zoneConf.show_time_diff ? this._getTimeDiff(tz) : "";

      tile.innerHTML = `
        <div class="zone-header">
          <div class="zone-title">
            <svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${name}</span>
          </div>
          ${diff ? `<span class="zone-pill" id="diff-${idx}">${diff}</span>` : ""}
        </div>

        ${zoneConf.show_clock ? `
          <div class="clock-section">
            <div class="digital-clock" id="clock-${idx}">--:--</div>
            <div class="date-label" id="date-${idx}">--</div>
          </div>
        ` : ""}

        <div class="weather-section" id="weather-${idx}">
          <div class="weather-icon" id="wicon-${idx}"></div>
          <div>
            <div class="weather-temp" id="wtemp-${idx}">--°C</div>
            <div class="weather-state" id="wstate-${idx}">Lade Wetter...</div>
            <div class="weather-meta" id="wmeta-${idx}"></div>
          </div>
        </div>

        ${zoneConf.show_persons ? `<div class="persons-row" id="persons-${idx}"></div>` : ""}
      `;

      grid.appendChild(tile);
    });

    this._updateClocks();
    this._updateContent();
  }

  _updateClocks() {
    if (!this._config) return;
    this._config.zones.forEach((zoneConf, idx) => {
      if (!zoneConf.show_clock) return;
      const clockEl = this.shadowRoot.getElementById(`clock-${idx}`);
      const dateEl = this.shadowRoot.getElementById(`date-${idx}`);
      const tz = this._getTimeZone(zoneConf);

      if (clockEl) {
        clockEl.textContent = this._formatLocalTime(tz, zoneConf.show_seconds, zoneConf.clock_format === "12h");
      }
      if (dateEl) {
        dateEl.textContent = this._formatLocalDate(tz);
      }
    });
  }

  _updateContent() {
    if (!this._config || !this._hass) return;

    this._config.zones.forEach((zoneConf, idx) => {
      const tz = this._getTimeZone(zoneConf);
      const diffEl = this.shadowRoot.getElementById(`diff-${idx}`);
      if (diffEl && zoneConf.show_time_diff) {
        diffEl.textContent = this._getTimeDiff(tz);
      }

      // Update Weather
      const weatherEntityId = zoneConf.weather_entity;
      const wIcon = this.shadowRoot.getElementById(`wicon-${idx}`);
      const wTemp = this.shadowRoot.getElementById(`wtemp-${idx}`);
      const wState = this.shadowRoot.getElementById(`wstate-${idx}`);
      const wMeta = this.shadowRoot.getElementById(`wmeta-${idx}`);

      if (weatherEntityId && this._hass.states[weatherEntityId]) {
        const w = this._hass.states[weatherEntityId];
        const stateKey = (w.state || "").toLowerCase();
        const iconSvg = WEATHER_ICONS[stateKey] || WEATHER_ICONS["partlycloudy"];

        if (wIcon) wIcon.innerHTML = iconSvg;
        if (wTemp) {
          const temp = w.attributes.temperature !== undefined ? `${w.attributes.temperature}°C` : "";
          wTemp.textContent = temp;
        }
        if (wState) {
          wState.textContent = w.state;
        }
        if (wMeta) {
          const metaParts = [];
          if (w.attributes.humidity !== undefined) metaParts.push(`💧 ${w.attributes.humidity}%`);
          if (w.attributes.wind_speed !== undefined) metaParts.push(`💨 ${w.attributes.wind_speed} km/h`);
          wMeta.textContent = metaParts.join(" • ");
        }
      } else {
        if (wTemp) wTemp.textContent = "";
        if (wState) wState.textContent = "Kein Wetter konfiguriert";
        if (wIcon) wIcon.innerHTML = WEATHER_ICONS["partlycloudy"];
      }

      // Update Persons in Zone
      if (zoneConf.show_persons) {
        const personsContainer = this.shadowRoot.getElementById(`persons-${idx}`);
        if (personsContainer) {
          const persons = this._getPersonsInZone(zoneConf);
          if (persons.length > 0) {
            personsContainer.innerHTML = persons.map(p => `
              <div class="person-chip">
                ${p.picture ? `<img class="person-avatar" src="${p.picture}"/>` : `<div class="person-avatar">${p.name.charAt(0)}</div>`}
                <span>${p.name}</span>
              </div>
            `).join("");
          } else {
            personsContainer.innerHTML = "";
          }
        }
      }
    });
  }
}

customElements.define("zone-clock-weather-card", ZoneClockWeatherCard);

// ==========================================
// VISUAL LOVELACE CARD EDITOR
// ==========================================
class ZoneClockWeatherCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  _render() {
    if (!this._config) return;

    this.shadowRoot.innerHTML = `
      <style>
        .editor-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 8px 0;
          font-family: var(--paper-font-body1_-_font-family);
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary-text-color, #475569);
        }
        input, select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--ha-card-border-color, #cbd5e1);
          background: var(--card-background-color, #ffffff);
          color: var(--primary-text-color, #0f172a);
          font-size: 0.9rem;
        }
        .zone-box {
          border: 1px solid var(--ha-card-border-color, #cbd5e1);
          border-radius: 12px;
          padding: 12px;
          background: var(--secondary-background-color, #f8fafc);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .zone-box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
        }
        .btn-delete {
          background: #ef4444;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
        }
        .btn-add {
          background: var(--primary-color, #0284c7);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 10px;
          font-weight: 600;
          cursor: pointer;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .checkbox-row input {
          width: 16px;
          height: 16px;
        }
      </style>

      <div class="editor-container">
        <div class="form-row">
          <label>Kartentitel</label>
          <input type="text" id="cfg-title" value="${this._config.title || ""}" placeholder="z. B. Weltzeit & Standorte"/>
        </div>

        <div class="form-row">
          <label>Spaltenanzahl</label>
          <select id="cfg-columns">
            <option value="1" ${this._config.columns === 1 ? "selected" : ""}>1 Spalte</option>
            <option value="2" ${this._config.columns === 2 ? "selected" : ""}>2 Spalten</option>
            <option value="3" ${this._config.columns === 3 ? "selected" : ""}>3 Spalten</option>
          </select>
        </div>

        <label style="margin-top: 6px;">Konfigurierte Zonen</label>
        <div id="zones-list" style="display:flex; flex-direction:column; gap:12px;"></div>

        <button class="btn-add" id="btn-add-zone">+ Zone hinzufügen</button>
      </div>
    `;

    this._renderZonesList();
    this._attachEvents();
  }

  _renderZonesList() {
    const list = this.shadowRoot.getElementById("zones-list");
    if (!list) return;
    list.innerHTML = "";

    const zones = this._config.zones || [];
    zones.forEach((z, idx) => {
      const box = document.createElement("div");
      box.className = "zone-box";
      box.innerHTML = `
        <div class="zone-box-header">
          <span>#${idx + 1} ${z.name || z.zone || "Zone"}</span>
          <button class="btn-delete" data-index="${idx}">Entfernen</button>
        </div>
        <div class="grid-2">
          <div class="form-row">
            <label>Zone-Entität</label>
            <input type="text" class="field-zone" data-index="${idx}" value="${z.zone || ""}" placeholder="zone.home"/>
          </div>
          <div class="form-row">
            <label>Name / Beschriftung</label>
            <input type="text" class="field-name" data-index="${idx}" value="${z.name || ""}" placeholder="Zuhause"/>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-row">
            <label>Zeitzone</label>
            <select class="field-timezone" data-index="${idx}">
              <option value="auto" ${z.timezone === "auto" ? "selected" : ""}>Auto (Home Assistant Standard)</option>
              <option value="Europe/Berlin" ${z.timezone === "Europe/Berlin" ? "selected" : ""}>Berlin / Mitteleuropa (UTC+1/+2)</option>
              <option value="Europe/London" ${z.timezone === "Europe/London" ? "selected" : ""}>London (UTC+0/+1)</option>
              <option value="America/New_York" ${z.timezone === "America/New_York" ? "selected" : ""}>New York (UTC-5/-4)</option>
              <option value="America/Los_Angeles" ${z.timezone === "America/Los_Angeles" ? "selected" : ""}>Los Angeles (UTC-8/-7)</option>
              <option value="Asia/Tokyo" ${z.timezone === "Asia/Tokyo" ? "selected" : ""}>Tokio (UTC+9)</option>
              <option value="Asia/Dubai" ${z.timezone === "Asia/Dubai" ? "selected" : ""}>Dubai (UTC+4)</option>
              <option value="Australia/Sydney" ${z.timezone === "Australia/Sydney" ? "selected" : ""}>Sydney (UTC+10/+11)</option>
            </select>
          </div>
          <div class="form-row">
            <label>Wetter-Entität</label>
            <input type="text" class="field-weather" data-index="${idx}" value="${z.weather_entity || ""}" placeholder="weather.forecast_home"/>
          </div>
        </div>
        <div class="grid-2" style="margin-top: 4px;">
          <div class="checkbox-row">
            <input type="checkbox" class="field-show-clock" data-index="${idx}" ${z.show_clock !== false ? "checked" : ""}/>
            <label>Uhr anzeigen</label>
          </div>
          <div class="checkbox-row">
            <input type="checkbox" class="field-show-seconds" data-index="${idx}" ${z.show_seconds ? "checked" : ""}/>
            <label>Sekunden anzeigen</label>
          </div>
        </div>
        <div class="grid-2">
          <div class="checkbox-row">
            <input type="checkbox" class="field-show-timediff" data-index="${idx}" ${z.show_time_diff !== false ? "checked" : ""}/>
            <label>Zeitdifferenz anzeigen</label>
          </div>
          <div class="checkbox-row">
            <input type="checkbox" class="field-show-persons" data-index="${idx}" ${z.show_persons !== false ? "checked" : ""}/>
            <label>Personen vor Ort</label>
          </div>
        </div>
      `;
      list.appendChild(box);
    });

    list.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.index);
        const newZones = [...(this._config.zones || [])];
        newZones.splice(i, 1);
        this._updateConfig({ ...this._config, zones: newZones });
      });
    });

    const bindField = (selector, key, isCheck = false) => {
      list.querySelectorAll(selector).forEach(input => {
        input.addEventListener("change", (e) => {
          const i = parseInt(e.target.dataset.index);
          const newZones = [...(this._config.zones || [])];
          newZones[i] = { ...newZones[i], [key]: isCheck ? e.target.checked : e.target.value };
          this._updateConfig({ ...this._config, zones: newZones });
        });
      });
    };

    bindField(".field-zone", "zone");
    bindField(".field-name", "name");
    bindField(".field-timezone", "timezone");
    bindField(".field-weather", "weather_entity");
    bindField(".field-show-clock", "show_clock", true);
    bindField(".field-show-seconds", "show_seconds", true);
    bindField(".field-show-timediff", "show_time_diff", true);
    bindField(".field-show-persons", "show_persons", true);
  }

  _attachEvents() {
    this.shadowRoot.getElementById("cfg-title")?.addEventListener("change", (e) => {
      this._updateConfig({ ...this._config, title: e.target.value });
    });
    this.shadowRoot.getElementById("cfg-columns")?.addEventListener("change", (e) => {
      this._updateConfig({ ...this._config, columns: parseInt(e.target.value) });
    });
    this.shadowRoot.getElementById("btn-add-zone")?.addEventListener("click", () => {
      const newZones = [
        ...(this._config.zones || []),
        { zone: "zone.work", name: "Neuer Standort", timezone: "auto", show_clock: true, show_persons: true, show_time_diff: true }
      ];
      this._updateConfig({ ...this._config, zones: newZones });
    });
  }

  _updateConfig(newConfig) {
    this._config = newConfig;
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this._render();
  }
}

customElements.define("zone-clock-weather-card-editor", ZoneClockWeatherCardEditor);

// Register in Home Assistant Lovelace custom cards list
window.customCards = window.customCards || [];
window.customCards.push({
  type: "zone-clock-weather-card",
  name: "Zone Clock & Weather Card",
  description: "Display local time, time difference, weather, and resident presence across Home Assistant zones with a visual editor.",
  preview: true,
  documentationURL: "https://github.com/adromir/ha-zone-clock-weather-card",
});

console.info(
  `%c ZONE-CLOCK-WEATHER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #0ea5e9; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #0ea5e9; background: #e0f2fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
