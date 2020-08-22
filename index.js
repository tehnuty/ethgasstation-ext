chrome.alarms.create('fetch_gas_price',{
    "periodInMinutes": 1
});

chrome.alarms.onAlarm.addListener(alarm => {
    fetchGasPrice();
});

function fetchGasPrice() {
    return fetch("https://ethgasstation.info/api/ethgasAPI.json")
        .then((res) => res.json())
        .then((data) => {
            // fast: gwei x10, that's why the conversion
            let fast_gwei = data["fast"] / 10
            chrome.browserAction.setBadgeText({text: fast_gwei.toString()});
        });
}

// initial update
fetchGasPrice();