# Pikud HaOref GraphQL API

This GraphQL API provides access to alerts data related to Pikud HaOref red alerts history.

![live](https://github.com/TuvalSimha/pikud-haoref-api-graphql/assets/37614975/01d09111-2ece-4116-9511-96627d4e0346)

## Usage

You can interact with this API by sending GraphQL queries to the provided endpoint.

## Endpoint

Live Query URL: [https://pikud-haoref-graphql-api.tuval-simha.workers.dev/graphql](https://pikud-haoref-graphql-api.tuval-simha.workers.dev/graphql)

## Example Queries

### Get all alerts from today:

```graphql
query AllAlertsFromToday {
    allAlertsFromToday(orderBy: CREATED_AT_DESC, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
            cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
```

### Get all alerts from last week:

```graphql
query AllAlertsFromLastWeek {
    allAlertsFromLastWeek(orderBy: CREATED_AT_DESC, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
            cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
```

### Get all alerts from last month:

```graphql
query AllAlertsFromLastMonth {
    allAlertsFromLastMonth(orderBy: CREATED_AT_DESC, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
            cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
```

### Get all alerts by date range:

- Make sure to insert the date in the format: DD.MM.YYYY

```graphql
query AllAlertsByDateRange($fromDateTime: DateTime, $toDateTime: DateTime) {
    allAlertsByDateRange(dates: { fromDateTime: $fromDateTime, toDateTime: $toDateTime }, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
            cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
```

## Pagination

For all queries, pagination is supported using the `first` and `after` arguments. The `first` argument determines the number of items to return per page, and the `after` argument is used to paginate through the result set.

- `first`: Specifies the number of items to return per page.
- `after`: Indicates the cursor to start paginating from.

## Filtering

You can filter alerts based on their type using the `typeBy` argument. This allows you to retrieve alerts of specific types only. The available types are:

- MISSILES
- UAV_INTRUSION
- EARTH_QUAKE
- RADIO_LOGICAL_EVENT
- TSUNAMI
- HAZARDOUS_MATERIALS
- TERRORIST_INFILTRATION
- DRILL_MISSILES
- DRILL_GENERAL
- DRILL_EARTH_QUAKE
- DRILL_RADIO_LOGICAL_EVENT
- DRILL_TSUNAMI
- DRILL_UAV_INTRUSION
- DRILL_HAZARDOUS_MATERIALS
- DRILL_TERRORIST_INFILTRATION

Make sure to pass the desired type as an argument when querying for alerts.

## Contributing

This repository is open-source, and contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Appreciate your help in improving this project!

If you find this project helpful and would like to support its development, consider buying me a coffee:

<a href="https://www.buymeacoffee.com/tuvalsimha" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
