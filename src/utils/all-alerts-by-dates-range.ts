import { formatDate } from "./format-date";

type AllAlertsByDateRangeProps = {
  from: string;
  to: string;
};

export async function allAlertsByDateRange({
  from,
  to,
}: AllAlertsByDateRangeProps) {
  const formatFrom = formatDate(from)
  const formatTo = formatDate(to)
  const url = `https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&fromDate=${formatFrom}&toDate=${formatTo}&mode=0`;
  const headers = {
    Connection: "keep-alive",
    Host: "www.oref.org.il",
    "X-Requested-With": "XMLHttpRequest",
    Referer: "https://www.oref.org.il/12402-he/Pakar.aspx",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  }
  try {
    const response = await fetch(url, { headers })
    console.log("response", response)
    if (!response.ok && response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status, response.body} `);
    }
    const data = await response.json()
    if (!data) {
      throw new Error("No data returned from the server");
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
