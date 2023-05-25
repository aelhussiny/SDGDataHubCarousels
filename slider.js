let configLocation = new URLSearchParams(window.location.search).get("config");
if (configLocation) {
    $.get(`./${configLocation}.json`).done(function (data) {
        if (data.cards) {
            let cardRow = null;
            data.cards.forEach((cardData, index) => {
                if (index % (isMediumorLarger() ? 4 : 1) == 0) {
                    cardRow = $("<div></div>")
                        .attr("class", "row cardrow")
                        .css("align-items", "center");
                    $(".carousel-inner").append(
                        $("<div></div>")
                            .attr(
                                "class",
                                "carousel-item" + (index == 0 ? " active" : "")
                            )
                            .append(cardRow)
                    );
                }
                cardRow.append(
                    $("<div></div>").attr("class", "cardcol col-md-3").html(`
                        <div class="arcgiscard" onclick="window.open('${
                            cardData.url
                        }')">
                            <img src="${cardData.image}">
                            <p class="title">${cardData.title}</p>
                            <p class="desc">${cardData.description.replace(/\\n/g,"<br/>")}</p>
                            <p class="ctabtn${
                                cardData.buttonType == "outline"
                                    ? " outline"
                                    : ""
                            }">${cardData.buttonText}</p>
                        </div>
                    `)
                );
            });
        }
    });
}

function isMediumorLarger(bp) {
    return $(window).width() >= 768;
}