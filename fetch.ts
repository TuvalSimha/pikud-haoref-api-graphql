// Function to fetch test data

type fetchAlertsProps = {
  fromDateTime: string;
  toDateTime: string;
};

export async function fetchAlerts({
  fromDateTime,
  toDateTime,
}: fetchAlertsProps) {
  const url = `https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&fromDate=${fromDateTime}&toDate=${toDateTime}&mode=0`;
  const headers = {
    Host: "www.oref.org.il",
    "X-Requested-With": "XMLHttpRequest",
    Referer: "https://www.oref.org.il/12481-he/Pakar.aspx",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    charset: "utf-8",
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "",
    "sec-ch-ua-platform": "macOS",
    Accept: "*/*",
    "sec-ch-ua":
      '".Not/A)Brand"v="99", "Google Chrome";v="103", "Chromium";v="103"',
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
  };

  try {
    const response = await fetch(url, { headers, method: "GET" });
    console.log("response", response);

    if (!response.ok && response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("No data returned from the server");
    }
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
