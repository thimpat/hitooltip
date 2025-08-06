const POSITIONS = {
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left",
    TOP: "top"
};

const ANIMATION_STYLES = {
    SMOOTH: "all ease-in-out .25s",
    FADE: "opacity ease-in-out .25s",
    NONE: "none"
};

const ANIMATION_TYPES = {
    SMOOTH: "smooth",
    FADE: "fade",
    NONE: "none"
};

const OPTIONS = {
    SPEED: "speed",
    DELAY: "delay",
    TIMEOUT: "timeout",
    SECONDARY_DELAY: "secondaryDelay",
    ANIMATION_TYPE: "animationType",
    ON_HIDE: "onHide",
    ON_HIDDEN: "onHidden",
    ON_SHOW: "onShow",
    ON_SHOWN: "onShown",
    MAX_VIEWS: "maxViews",
    DYNAMIC_MONITORING: "dynamicMonitoring"
};

const viewTable = {

};

/**
 * @typedef {Object} OPTIONS
 * @property {number} delay Delay before displaying tooltip
 * @property {number} secondaryDelay Delay before the tooltip won't start from the last position
 * @property {number} speed Animation time for  the transition to happen
 * @property {number} timeout Tooltip lifetime
 * @property {number} maxViews Number of times a tooltip can appear on the element
 * @property {boolean} dynamicMonitoring Whether to consider elements added dynamically
 * @property {function} [onHide] Call before hiding tooltip
 * @property {function} [onHidden] Call after hiding tooltip
 * @property {function} [onShow] Call before showing tooltip
 * @property {function} [onShown] Call after displaying tooltip
 */
const options = {
    [OPTIONS.SPEED]: 250,
    [OPTIONS.DELAY]: 500,
    [OPTIONS.TIMEOUT]: 3000,
    [OPTIONS.SECONDARY_DELAY]: 500,
    [OPTIONS.ANIMATION_TYPE]: ANIMATION_TYPES.SMOOTH,
    [OPTIONS.ON_HIDE]: null,
    [OPTIONS.ON_HIDDEN]: null,
    [OPTIONS.ON_SHOW]: null,
    [OPTIONS.ON_SHOWN]: null,
    [OPTIONS.MAX_VIEWS]: 0,
    [OPTIONS.DYNAMIC_MONITORING]: "body"
};

let onMouseOverDelayTimerID, onMouseOutTimerID, onMouseTimeoutTimerID;
let isSameTarget = false;

/**
 * @param object
 * @param value
 * @returns {string}
 */
const getKeyByValue = function (object, value)
{
    return Object.keys(object).find(key => object[key] === value);
};

/**
 * Create a guid/uuid
 * @see https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
 * @returns {*}
 */
const uuidv4 = function ()
{
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export const setHiTooltipOptions = function (opts)
{
    Object.assign(options, opts);
};

export const getHiTooltipOptions = function ()
{
    return options;
};

/**
 * Returns option value for a particular key
 * @param currentTarget
 * @param optionName
 * @returns {*}
 */
export const getOption = function (currentTarget = null, optionName = "")
{
    if (!optionName)
    {
        return ;
    }

    if (currentTarget)
    {
        const dataname = "hitooltip" + optionName.charAt(0).toUpperCase() + optionName.slice(1);
        if (currentTarget.dataset.hasOwnProperty(dataname))
        {
            return currentTarget.dataset[dataname];
        }
    }
    const options = getHiTooltipOptions();
    return options[optionName];
};

export const applyHiTooltipOptions = function ($tooltip)
{
    const options = getHiTooltipOptions();

    if (Object.hasOwn(options, OPTIONS.SPEED))
    {
        $tooltip.style.transition = `all ease-in-out ${options.speed}ms`;
    }
};

/**
 * Create the unique tooltip object
 */
export const createHiTooltip = function ()
{
    const $tooltip = document.createElement("tooltip");
    $tooltip.classList.add("hitooltip");
    $tooltip.id = "hitooltip";

    const $tooltipContent = document.createElement("div");
    $tooltipContent.classList.add("hitooltip-content");

    const $tooltipText = document.createElement("div");
    $tooltipText.classList.add("hitooltip-text");

    $tooltipContent.appendChild($tooltipText);
    $tooltip.appendChild($tooltipContent);

    applyHiTooltipOptions($tooltip);

    document.body.appendChild($tooltip);
};

const generateHiTooltipContent = function ($div)
{
    const text = $div.dataset.hitooltipText || $div.dataset.hitooltip;

    // Tooltip content from a template
    const selectorTpl = $div.dataset.hitooltipTemplate;
    if (selectorTpl)
    {
        const template = document.querySelector(selectorTpl);
        if (template instanceof HTMLTemplateElement) {
        return template.content.cloneNode(true);
    }

        return template.cloneNode(true);
    }

    // Tooltip content from a selector
    const selectorTarget = $div.dataset.hitooltipTarget;
    if (selectorTarget)
    {
        const $template = document.querySelector(selectorTarget);
        const $clone = $template.cloneNode(true);
        $clone.removeAttribute("id");
        return $clone;
    }

    // Tooltip content from title and icon
    const iconPath = $div.dataset.hitooltipIcon;
    const titleText = $div.dataset.hitooltipTitle;
    if (iconPath && titleText && text)
    {
        const $template = document.createElement("div");
        $template.classList.add("hitooltip-inner-content");
        $template.innerHTML = `<div class="hitooltip-header"><img src="${iconPath}" alt="tooltip-content" class="hitooltip-img" /><h1 class="hitooltip-h1">${titleText}</h1></div>
<hr><span class="hitooltip-text">${text}</span>`;
        return $template;
    }
    else if (titleText && text)
    {
        const $template = document.createElement("div");
        $template.innerHTML = `<div class="hitooltip-header"><h1 class="hitooltip-h1">${titleText}</h1></div>
<hr><span class="hitooltip-text">${text}</span>`;
        return $template;
    }
    else if (iconPath && titleText)
    {
        const $template = document.createElement("div");
        $template.classList.add("hitooltip-inner-content");
        $template.innerHTML = `<div class="hitooltip-header"><img src="${iconPath}" alt="tooltip-content" class="hitooltip-img" /><h1 class="hitooltip-h1">${titleText}</h1></div>`;
        return $template;
    }
    else if (iconPath && text)
    {
        const $template = document.createElement("div");
        $template.classList.add("hitooltip-inner-content");
        $template.innerHTML = `<div class="hitooltip-header"><img src="${iconPath}" alt="tooltip-content" class="hitooltip-img" /><h1 class="hitooltip-h1">${text}</h1></div>`;
        return $template;
    }
    else if (iconPath)
    {
        const $template = document.createElement("div");
        $template.classList.add("hitooltip-inner-content");
        $template.innerHTML = `<div class="hitooltip-header"><img src="${iconPath}" alt="tooltip-content" class="hitooltip-img" /></div>`;
        return $template;
    }

    // Tooltip content from some text
    if (text)
    {
        const $span = document.createElement("span");
        $span.classList.add("hitooltip-text");
        $span.textContent = text;
        return $span;
    }
};

const getHiTooltipContent = function ()
{
    return document.querySelector("#hitooltip .hitooltip-content");
};

const dissimulateHiTooltipContent = function ()
{
    const $tooltipContent = getHiTooltipContent();
    if (!$tooltipContent)
    {
        console.error(`Failed to find hitooltip content`);
        return;
    }

    $tooltipContent.visibility = "hidden";
    $tooltipContent.opacity = "0";
};

const clearHiTooltipContent = function ()
{
    const $tooltipContent = getHiTooltipContent();
    if (!$tooltipContent)
    {
        console.error(`Failed to find hitooltip content`);
        return;
    }

    $tooltipContent.innerHTML = "";
};

const getTooltipCharacteristics = function ()
{
    const $tooltip = document.getElementById("hitooltip");
    if (!$tooltip)
    {
        return {};
    }

    const $tooltipContent = getHiTooltipContent();
    if (!$tooltipContent)
    {
        console.error(`Failed to find hitooltip content`);
    }

    return { $tooltip, $tooltipContent };
};

const hideHiTooltipContent = function (event, currentTarget = null)
{
    const { $tooltip } = getTooltipCharacteristics();
    $tooltip.classList.add("hitooltip-hidden");
    $tooltip.classList.remove("hitooltip-shown");

    const delay = getOption(currentTarget, OPTIONS.DELAY) + getOption(currentTarget, OPTIONS.SECONDARY_DELAY);

    clearTimeout(onMouseOverDelayTimerID);
    onMouseOverDelayTimerID = null;

    clearTimeout(onMouseOutTimerID);

    currentTarget = currentTarget || event.currentTarget;

    onMouseOutTimerID = setTimeout(function ()
    {
        const onHide = getOption(currentTarget, OPTIONS.ON_HIDE);
        if (onHide)
        {
            onHide.call(currentTarget, event);
        }

        const { $tooltip } = getTooltipCharacteristics();
        $tooltip.style.top = "unset";
        $tooltip.style.left = "unset";
        $tooltip.classList.add("hitooltip-hidden");

        const onHidden = getOption(currentTarget, OPTIONS.ON_HIDDEN);
        if (onHidden)
        {
            onHidden.call(currentTarget, event); ;
        }
    }, delay);
};

const revealHiTooltipContent = function (event, currentTarget)
{
    const { $tooltip } = getTooltipCharacteristics();

    const onShow = getOption(currentTarget, OPTIONS.ON_SHOW);
    if (onShow)
    {
        onShow.call(currentTarget, event);
    }

    $tooltip.classList.add("hitooltip-shown");
    $tooltip.classList.remove("hitooltip-hidden");

    const onShown = getOption(currentTarget, OPTIONS.ON_SHOWN);
    if (onShown)
    {
        onShown.call(currentTarget, event);
    }

    const hitooltipId = currentTarget.dataset.hitooltipId;
    currentTarget.dataset.hitooltipViewLeft = "" + --viewTable[hitooltipId];
};

const updateHiTooltipContent = function ($content)
{
    const $tooltipContent = getHiTooltipContent();
    clearHiTooltipContent();
    $tooltipContent.appendChild($content);
};

export const destroyHiTooltip = function ()
{
    const $tooltip = document.getElementById("hitooltip");
    if (!$tooltip)
    {
        return;
    }

    $tooltip.remove();
};

const clearTimeouts = function ()
{
    clearTimeout(onMouseTimeoutTimerID);
    clearTimeout(onMouseOverDelayTimerID);
    clearTimeout(onMouseOutTimerID);
    onMouseOverDelayTimerID = null;
    onMouseOutTimerID = null;
    onMouseTimeoutTimerID = null;
};

const onMouseEnter = function ()
{
    isSameTarget = false;
    clearTimeouts();
    dissimulateHiTooltipContent();
};

/**
 *
 * @param event
 * @param posTooltip
 * @param {{RIGHT: string, TOP: string, LEFT: string, BOTTOM: string}} choices
 * @param currentTarget
 * @returns {*}
 */
const onMouseOver = function (event, { posTooltip = "", choices = { ...POSITIONS }, currentTarget = null, })
{
    clearTimeout(onMouseOutTimerID);
    onMouseOutTimerID = null;

    const $tooltip = document.getElementById("hitooltip");
    $tooltip.classList.add("hitooltip-hidden");

    currentTarget = currentTarget || event.currentTarget;

    const $content = generateHiTooltipContent(currentTarget);
    if (!$content)
    {
        return false;
    }

    updateHiTooltipContent($content);

    posTooltip = posTooltip || currentTarget.getAttribute("data-hitooltip-position") || POSITIONS.RIGHT;
    $tooltip.setAttribute("data-hitooltip-position", posTooltip);
    const key = getKeyByValue(POSITIONS, posTooltip);
    delete choices[key];
    const rest = Object.values(choices);

    let tooltipPosition;

    const targetCoordinates = currentTarget.getBoundingClientRect();
    const tooltipSize = $tooltip.getBoundingClientRect();

    if (posTooltip === POSITIONS.LEFT)
    {
        tooltipPosition = {
            x: targetCoordinates.x - tooltipSize.width - 5,
            y: targetCoordinates.y + targetCoordinates.height / 2 - tooltipSize.height / 2
        };
    }
    else if (posTooltip === POSITIONS.TOP)
    {
        tooltipPosition = {
            x: targetCoordinates.x + targetCoordinates.width / 2 - tooltipSize.width / 2,
            y: targetCoordinates.y - tooltipSize.height - 5
        };
    }
    else if (posTooltip === POSITIONS.BOTTOM)
    {
        tooltipPosition = {
            x: targetCoordinates.x + targetCoordinates.width / 2 - tooltipSize.width / 2,
            y: targetCoordinates.y + targetCoordinates.height + 5
        };
    }
    else
    {
        tooltipPosition = {
            x: targetCoordinates.x + targetCoordinates.width + 5,
            y: targetCoordinates.y + targetCoordinates.height / 2 - tooltipSize.height / 2
        };
    }

    if (tooltipPosition.x < 0)
    {
        tooltipPosition.x = 0;
    }

    if (tooltipPosition.y < 0)
    {
        tooltipPosition.y = 0;
    }

    // Check positioning
    if (posTooltip === POSITIONS.LEFT || posTooltip === POSITIONS.RIGHT)
    {
        if (tooltipSize.height > window.innerHeight)
        {
            console.info(`The viewport is too small to display this tooltip`);
            return false;
        }
        else if (tooltipPosition.y < 0)
        {
            tooltipPosition.y = 0;
        }
        else if (tooltipPosition.y + tooltipSize.height > window.innerHeight)
        {
            tooltipPosition.y = window.innerHeight - tooltipPosition.height;
        }
    }

    if (posTooltip === POSITIONS.RIGHT)
    {
        if (tooltipPosition.x + tooltipSize.width > window.innerWidth)
        {
            if (rest.length <= 0)
            {
                return false;
            }
            return onMouseOver(event, { posTooltip: rest[0], choices, currentTarget });
        }
    }
    if (posTooltip === POSITIONS.LEFT)
    {
        if (tooltipPosition.x + tooltipSize.width > targetCoordinates.x)
        {
            if (rest.length <= 0)
            {
                return false;
            }
            return onMouseOver(event, { posTooltip: rest[0], choices, currentTarget });
        }
    }

    if (posTooltip === POSITIONS.BOTTOM)
    {
        if (tooltipPosition.y + tooltipSize.height > window.innerHeight)
        {
            if (rest.length <= 0)
            {
                return false;
            }
            return onMouseOver(event, { posTooltip: rest[0], choices, currentTarget });
        }
    }

    if (posTooltip === POSITIONS.TOP)
    {
        if (tooltipPosition.y + tooltipSize.height > targetCoordinates.y)
        {
            if (rest.length <= 0)
            {
                return false;
            }
            return onMouseOver(event, { posTooltip: rest[0], choices, currentTarget });
        }
    }

    $tooltip.style.top = tooltipPosition.y + "px";
    $tooltip.style.left = tooltipPosition.x + "px";

    revealHiTooltipContent(event, currentTarget);

    return true;
};

const onMouseOverDelayed = function (event)
{
    let currentTarget = event.currentTarget;
    if (currentTarget.dataset.hitooltipMaxViews || getOption(currentTarget, OPTIONS.MAX_VIEWS))
    {
        const hitooltipId = currentTarget.dataset.hitooltipId;
        if (viewTable[hitooltipId] <= 0)
        {
            return;
        }
    }

    if (isSameTarget)
    {
        return;
    }

    const delay = getOption(currentTarget, OPTIONS.DELAY);

    // Timeout for the delay option
    clearTimeout(onMouseOverDelayTimerID);
    onMouseOverDelayTimerID = setTimeout(function ()
    {
        const animationType = getOption(currentTarget, OPTIONS.ANIMATION_TYPE);
        if (animationType)
        {
            const { $tooltip } = getTooltipCharacteristics();
            $tooltip.style.transition = ANIMATION_STYLES[animationType.toUpperCase()];
        }

        onMouseOverDelayTimerID = null;
        const displayed = onMouseOver(event, { currentTarget });

        if (displayed)
        {
            isSameTarget = true;

            // Timeout for the timeout option
            const timeout = getOption(currentTarget, OPTIONS.TIMEOUT);
            clearTimeout(onMouseTimeoutTimerID);
            onMouseTimeoutTimerID = setTimeout(function ()
            {
                onMouseTimeoutTimerID = null;
                hideHiTooltipContent(event, currentTarget);
            }, timeout);
        }
    }, delay);
};

const onMouseOut = function (event)
{
    hideHiTooltipContent(event);
};

/**
 * Set a listener on every tag that has the hi-tooltip properties
 * @param $target
 */
const attachTooltip = function ($target)
{
    const domHashElement = uuidv4();
    viewTable[domHashElement] = $target.dataset.hitooltipMaxViews || getOption($target, OPTIONS.MAX_VIEWS);
    $target.dataset.hitooltipId = domHashElement;

    $target.addEventListener("mouseenter", onMouseEnter);
    $target.addEventListener("mousemove", onMouseOverDelayed);
    $target.addEventListener("mouseout", onMouseOut);
};

const onGlobalMouseClick = function (event) {
    hideHiTooltipContent(event);
}

const init = function ()
{
    // Reference all tags that contain the hi-tooltips property
    let $targets = [...document.querySelectorAll("[data-hitooltip]")];

    // Create a unique tooltip object (Only the content will change)
    createHiTooltip();

    // Set a listener on selected tags
    $targets.forEach(attachTooltip);

    let totalTooltipped = $targets.length;

    // containerSelector by default is body
    const containerSelector = getOption(null, OPTIONS.DYNAMIC_MONITORING);
    if (containerSelector)
    {
        const $container = document.querySelector(containerSelector);
        $container.addEventListener("click", onGlobalMouseClick);
        const observer = new MutationObserver(function (mutations)
        {
            let $targets = [...document.querySelectorAll("[data-hitooltip]")];
            if (totalTooltipped === $targets.length)
            {
                return;
            }

            totalTooltipped = $targets.length;
            let $targets2 = $targets.filter(($target) => !$target.dataset.hitooltipId);

            if ($targets2.length)
            {
                $targets2.forEach(attachTooltip);
            }
        });
        observer.observe($container || document, { attributes: true, childList: true, characterData: false, subtree: true });
    }
};

export const hitooltip =  init;

