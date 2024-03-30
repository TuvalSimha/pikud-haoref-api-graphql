# Pikud HaOref GraphQL API

This GraphQL API provides access to alerts data related to Pikud HaOref red alerts history.

![live](https://github.com/TuvalSimha/pikud-haoref-api-graphql/assets/37614975/01d09111-2ece-4116-9511-96627d4e0346)

## Usage

You can interact with this API by sending GraphQL queries to the provided endpoint.

## Endpoint

Live Query URL: https://pikud-haoref-graphql-api.tuval-simha.workers.dev/graphql

## Example Queries

### Get all alerts from today:

```
query AllAlertsFromToday {
    allAlertsFromToday(orderBy: CREATED_AT_DESC) {
        category
        date
        location
        title
    }
}
```

### Get all alerts from last week:

```
query AllAlertsFromLastWeek {
    allAlertsFromLastWeek(orderBy: CREATED_AT_DESC) {
        category
        date
        location
        title
    }
}
```

### Get all alerts from last month:

```
query AllAlertsFromLastMonth {
    allAlertsFromLastMonth(orderBy: CREATED_AT_DESC) {
        category
        date
        location
        title
    }
}
```

### Get all alerts by date range:

- Make sure to insert to date format like that: DD.MM.YYYY

```
query AllAlertsByDateRange($fromDateTime: DateTime, $toDateTime: DateTime) {
    allAlertsByDateRange(dates: { fromDateTime: $fromDateTime, toDateTime: $toDateTime }) {
        category
        date
        location
        title
    }
}
```

## Contributing

This repository is open-source, and contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Appreciate your help in improving this project!

If you find this project helpful and would like to support its development, consider buying me a coffee:

<a href="https://www.buymeacoffee.com/tuvalsimha" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
