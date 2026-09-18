(() => {
  const STORAGE_KEY = "mn-color-style-v1";
  const DEFAULT_STYLE = "classic";
  const STYLES = [
    { id: "classic", name: "经典" },
    { id: "ocean", name: "海盐蓝" },
    { id: "paper", name: "杏仁书页" },
    { id: "sage", name: "鼠尾草" },
    { id: "iris", name: "鸢尾紫" },
  ];

  const validStyle = (value) => STYLES.some((style) => style.id === value);

  const readStyle = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return validStyle(stored) ? stored : DEFAULT_STYLE;
    } catch (_) {
      return DEFAULT_STYLE;
    }
  };

  const saveStyle = (style) => {
    try {
      localStorage.setItem(STORAGE_KEY, style);
    } catch (_) {
      // The style still applies for this page when storage is unavailable.
    }
  };

  const applyStyle = (style, persist = false) => {
    const selected = validStyle(style) ? style : DEFAULT_STYLE;
    document.body.dataset.mnStyle = selected;
    if (persist) saveStyle(selected);

    document.querySelectorAll(".mn-theme-option").forEach((option) => {
      option.setAttribute("aria-checked", String(option.dataset.style === selected));
    });

    const current = STYLES.find((item) => item.id === selected);
    const trigger = document.querySelector(".mn-theme-picker__button");
    if (trigger && current) trigger.title = `页面配色：${current.name}`;
  };

  const closePicker = (picker, returnFocus = false) => {
    const button = picker.querySelector(".mn-theme-picker__button");
    const panel = picker.querySelector(".mn-theme-picker__panel");
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (returnFocus) button.focus();
  };

  const createPicker = () => {
    const existing = document.querySelector(".mn-theme-picker");
    if (existing) return existing;

    const paletteToggle = document.querySelector('.md-header__option[data-md-component="palette"]');
    if (!paletteToggle) return null;

    const picker = document.createElement("div");
    picker.className = "mn-theme-picker";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "md-header__button md-icon mn-theme-picker__button";
    button.setAttribute("aria-label", "选择页面配色");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5 1.5 1.5 0 0 1 14.5 5 1.5 1.5 0 0 1 16 6.5 1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5 1.5 1.5 0 0 1 9.5 5 1.5 1.5 0 0 1 11 6.5 1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5 1.5 1.5 0 0 1 6.5 9 1.5 1.5 0 0 1 8 10.5 1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8"/></svg>';

    const panel = document.createElement("div");
    panel.className = "mn-theme-picker__panel";
    panel.hidden = true;
    panel.innerHTML = '<div class="mn-theme-picker__heading"><strong>页面配色</strong></div>';

    const options = document.createElement("div");
    options.className = "mn-theme-picker__options";
    options.setAttribute("role", "radiogroup");
    options.setAttribute("aria-label", "页面配色风格");

    STYLES.forEach((style) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "mn-theme-option";
      option.dataset.style = style.id;
      option.setAttribute("role", "radio");
      option.setAttribute("aria-checked", "false");
      option.innerHTML = `
        <span class="mn-theme-option__swatches" aria-hidden="true"></span>
        <span class="mn-theme-option__copy"><strong>${style.name}</strong></span>
        <span class="mn-theme-option__check" aria-hidden="true">✓</span>`;
      option.addEventListener("click", () => {
        applyStyle(style.id, true);
        closePicker(picker, true);
      });
      options.appendChild(option);
    });

    panel.appendChild(options);
    picker.append(button, panel);
    paletteToggle.before(picker);

    button.addEventListener("click", () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) {
        const checked = panel.querySelector('[aria-checked="true"]');
        if (checked) checked.focus();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!panel.hidden && !picker.contains(event.target)) closePicker(picker);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) closePicker(picker, true);
    });

    return picker;
  };

  const init = () => {
    createPicker();
    applyStyle(readStyle());
  };

  if (typeof document$ !== "undefined") document$.subscribe(init);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
