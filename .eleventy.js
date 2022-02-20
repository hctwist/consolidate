
module.exports = function(eleventyConfig) {

	eleventyConfig.setTemplateFormats(["liquid", "md", "css"]);

    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("downloads");
    eleventyConfig.addPassthroughCopy("photo-swipe");
	eleventyConfig.ignores.add("photo-swipe");

    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
    eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
    eleventyConfig.addPassthroughCopy("apple-touch-icon");
    eleventyConfig.addPassthroughCopy("browserconfig.xml");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("favicon-16x16.png");
    eleventyConfig.addPassthroughCopy("favicon-32x32.png");
    eleventyConfig.addPassthroughCopy("mstile-150x150.png");
    eleventyConfig.addPassthroughCopy("safari-pinned-tab.svg");
    eleventyConfig.addPassthroughCopy("site.webmanifest");

    eleventyConfig.addFilter("spaceifempty", function(text) {

        return text == undefined || text == "" ? "&nbsp;" : text;
    });

    eleventyConfig.addFilter("safeupcase", function(text) {

        return text == undefined ? "" : text.toUpperCase();
    });

    eleventyConfig.addFilter("sortprojects", function(projects) {

        return projects.sort(compareProjects);
    });
};

function compareProjects(p1, p2) {

    const p1Order = p1.data.importance;
    const p2Order = p2.data.importance;

    if(p1Order != undefined && p2Order != undefined) {

        return p2Order - p1Order;
    }
    else if(p1Order != undefined) {

        return -1;
    }
    else if(p2Order != undefined) {

        return 1;
    }
    else {

        const statusCompare = compareProjectsStatus(p1, p2);
        if(statusCompare != 0) {

            return statusCompare;
        }
        else {

            return compareProjectsDate(p1, p2);
        }
    }
}

function compareProjectsStatus(p1, p2) {

    return getProjectsStatusRank(p2) - getProjectsStatusRank(p1);
}

function getProjectsStatusRank(p) {

    switch(p.data.status) {

        case "released":
            return 5;
        case "beta":
            return 4;
        case "alpha":
            return 3;
        case "concept":
            return 2;
        case undefined:
            return 1;
        default:
            return 0;
    }
}

function compareProjectsDate(p1, p2) {

    return p2.date - p1.date;
}
