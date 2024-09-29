const cron = require('node-cron');
const axios = require('axios');

let isCronStarted = false;

module.exports.handleEvent = async function({ api }) {
    if (!isCronStarted) {
        startAutoPost(api);
        isCronStarted = true;
    }
};

function startAutoPost(api) {
    cron.schedule("0 * * * *", async function () { 
        try {
            const response = await axios.get("https://api.popcat.xyz/pickuplines");
            const pickupLine = response.data.pickupline;

            const message = global.convertToGothic(`“${pickupLine}”`);

            const formData = {
                input: {
                    composer_entry_point: "inline_composer",
                    composer_source_surface: "timeline",
                    idempotence_token: `${Date.now()}_FEED`,
                    source: "WWW",
                    message: {
                        text: message,
                    },
                    audience: {
                        privacy: {
                            base_state: "EVERYONE",
                        },
                    },
                    actor_id: api.getCurrentUserID(),
                },
            };

            await api.httpPost(
                "https://www.facebook.com/api/graphql/",
                {
                    av: api.getCurrentUserID(),
                    fb_api_req_friendly_name: "ComposerStoryCreateMutation",
                    fb_api_caller_class: "RelayModern",
                    doc_id: "7711610262190099",
                    variables: JSON.stringify(formData),
                }
            );

        } catch (error) {
            console.error("Error during auto-posting:", error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Manila",
    });
}
