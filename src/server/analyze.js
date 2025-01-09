const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";
const axios = require("axios");

const analyze = async (url, key) => {
    try {
        if (!key) {
            return handleError(100, "API key is missing or invalid");
        }
        if (!url) {
            return handleError(100, "URL is missing or invalid");
        }

        const analysis = await axios.get(`${meaningCloud}`, {
            params: {
                key: key,
                url: url,
                lang: "en"
            }
        });

        const { code, msg } = analysis.data.status;
        console.log("Response Status:", analysis.data.status); // Debugging

        if (code == 100) {
            return handleError(code, "Please enter a valid URL");
        } else if (code == 212) {
            return handleError(code, msg);
        }
        return successResponse(analysis.data, code);
    } catch (error) {
        console.error("API Call Error:", error.message); // Debugging
        return handleError(500, "Internal server error or network issue");
    }
};

const handleError = (code, msg) => {
    return { code, msg };
};

const successResponse = (data, code) => {
    console.log(data)
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    return {
        sample: { score_tag, agreement, subjectivity, confidence, irony },
        status: code
    };
};

module.exports = { analyze };
