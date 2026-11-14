# 🌍 Zone Clock & Weather Card for Home Assistant

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=adromir&repository=ha-zone-clock-weather-card&category=plugin)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/adromir)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/adromir/ha-zone-clock-weather-card?style=for-the-badge&color=blue)](https://github.com/adromir/ha-zone-clock-weather-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/adromir/ha-zone-clock-weather-card)

An elegant, custom Lovelace card for Home Assistant that displays **live local time, time difference, local weather, and resident presence across your Home Assistant zones** (e.g., Home, Work, Vacation Home, or remote international locations).

Equipped with a complete visual **GUI Card Editor**, zero external dependencies, vector weather animations, and 100% Home Assistant theme token compliance.

---

## 🎯 Key Features

- 🕒 **Live Local Time per Zone**: Renders live digital clocks with localized day and date format (`Intl.DateTimeFormat`) for any IANA timezone (Berlin, London, New York, Tokyo, Sydney, etc.).
- 🌐 **Time Difference Pill**: Instantly shows the time difference relative to your home timezone (e.g. `+7 Std.`, `-6 Std.`, or `Lokale Zeit`).
- ⛅ **Integrated Zone Weather**: Displays current temperature, weather condition vector icon, condition text, and humidity/wind speed metrics for linked `weather.*` entities.
- 👤 **Presence Badges**: Automatically detects and displays which tracked persons (`person.*`) are currently inside each zone, with their avatar or initials.
- 📐 **Responsive Multi-Zone Grid**: Display 1, 2, or 3 columns that dynamically adjust to mobile, tablet, and desktop viewports.
- 🛠️ **Visual GUI Card Editor**: Add, configure, and reorder zones directly in the Home Assistant dashboard UI without editing YAML.

---

## 📦 Installation

### Method 1: HACS (Recommended)

1. Click the button below to add this repository directly to HACS:

   [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=adromir&repository=ha-zone-clock-weather-card&category=plugin)

2. Or manually in HACS:
   - Go to **HACS** > **Frontend** > **Three dots menu (top right)** > **Custom repositories**.
   - URL: `https://github.com/adromir/ha-zone-clock-weather-card`
   - Type: `Lovelace` (or `Plugin`)
   - Click **Add**, then find **Zone Clock & Weather Card** and click **Download**.

### Method 2: Manual Installation
1. Download `zone-clock-weather-card.js` from the latest release.
2. Place it in `<config>/www/community/ha-zone-clock-weather-card/zone-clock-weather-card.js`.
3. Add `/local/community/ha-zone-clock-weather-card/zone-clock-weather-card.js` as a Lovelace resource (JavaScript Module).

---

## 🚀 YAML Configuration Example

```yaml
type: custom:zone-clock-weather-card
title: "Weltzeit & Standorte"
columns: 2
zones:
  - zone: zone.home
    name: "Zuhause (Hannover)"
    timezone: Europe/Berlin
    weather_entity: weather.forecast_home
    show_clock: true
    show_seconds: false
    show_time_diff: true
    show_persons: true

  - zone: zone.work
    name: "Büro / Hauptquartier"
    timezone: Europe/Berlin
    show_clock: true
    show_time_diff: true
    show_persons: true

  - zone: zone.new_york
    name: "New York Office"
    timezone: America/New_York
    show_clock: true
    show_time_diff: true

  - zone: zone.tokyo
    name: "Tokio Niederlassung"
    timezone: Asia/Tokyo
    show_clock: true
    show_time_diff: true
```

---

## 📄 Disclaimer

This is a custom community card and is not officially affiliated with or endorsed by Nabu Casa or Home Assistant.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

**Author**: [Adromir](https://github.com/adromir)  
Website: [https://github.com/adromir](https://github.com/adromir)
