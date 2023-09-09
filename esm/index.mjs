const generateTooltip = function ()
{
    const $tooltip = document.createElement("tooltip");
    $tooltip.classList.add("hey-tooltip");
    $tooltip.id = "hey-tooltip";

    const $tooltipContent = document.createElement("div");
    $tooltipContent.classList.add("tooltip-content");

    const $tooltipText = document.createElement("span");

    $tooltipContent.appendChild($tooltipText);
    $tooltip.appendChild($tooltipContent);
    document.body.appendChild($tooltip);
};

const isSameTarget = function ($currentTarget, $target)
{
    let $current = event.currentTarget;
    do
    {
        if ($current === $target)
        {
            return true;
        }

        if ($current === $currentTarget.parentElement)
        {
            return true;
        }

        $current = $currentTarget.parentElement;
        console.log(`$target = ${$current}`);
    }
    while ($current);

    return false;
};

const onMouseEnter = function (event)
{
    const text = this.dataset.tooltip;
    if (!text)
    {
        return;
    }

    const $tooltip = document.getElementById("hey-tooltip");
    if (!$tooltip)
    {
        generateTooltip();
    }

    const $tooltipContent = document.querySelector("#hey-tooltip .tooltip-content");
    $tooltipContent.textContent = text;

    const posTooltip = this.getAttribute("data-tooltip-position") || "left";
    $tooltip.setAttribute("data-tooltip-position", posTooltip);

    let tooltipPosition;

    console.log(event.currentTarget);

    // $tooltip.style.opacity = "0";
    $tooltip.style.visibility = "visible";

    const targetCoordinates = event.currentTarget.getBoundingClientRect();
    const tooltipCoordinates = $tooltip.getBoundingClientRect();

    console.log(tooltipCoordinates.width);

    if (posTooltip === "left")
    {
        // tooltipPosition = {
        //   x: targetCoordinates.x - targetCoordinates.width / 2 - 5,
        //   y: targetCoordinates.y + targetCoordinates.height / 2 - tooltipCoordinates.height / 2
        // };
        tooltipPosition = {
            x: targetCoordinates.x - targetCoordinates.width / 2 - tooltipCoordinates.width,
            y: targetCoordinates.y + targetCoordinates.height / 2 - tooltipCoordinates.height / 2
        };
    }
    else if (posTooltip === "top")
    {
        tooltipPosition = { x: targetCoordinates.x, y: targetCoordinates.y - targetCoordinates.height / 2 };
    }
    else if (posTooltip === "bottom")
    {
        tooltipPosition = { x: targetCoordinates.x, y: targetCoordinates.y + targetCoordinates.height / 2 };
    }
    else
    {
        tooltipPosition = {
            x: targetCoordinates.x + targetCoordinates.width / 2 - 5,
            y: targetCoordinates.y + targetCoordinates.height / 2 - tooltipCoordinates.height / 2
        };
    }

    $tooltip.style.top = tooltipPosition.y + "px";
    $tooltip.style.left = tooltipPosition.x + "px";
};

const onMouseOut = function (event)
{
    // console.log(`$target = ${event.currentTarget}`);
    // console.log(`$target = ${event.target}`);

    // $tooltip.style.visibility = "hidden";
    // $tooltip.remove();
    // $tooltip = null;
};

const init = function ()
{
    let $targets = [...document.querySelectorAll("[data-tooltip]")];

    generateTooltip();

    $targets.forEach(function ($target)
    {
        $target.addEventListener("mousemove", onMouseEnter)
        $target.addEventListener("mouseout", onmouseout)
    });
};

(function ()
{
    init();
}());
