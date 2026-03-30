# Pikud HaOref GraphQL API

This GraphQL API provides access to alerts data related to Pikud HaOref red alerts history.

![live](https://github.com/TuvalSimha/pikud-haoref-api-graphql/assets/37614975/01d09111-2ece-4116-9511-96627d4e0346)

## Usage

You can interact with this API by sending GraphQL queries to the provided endpoint.

## Endpoint

Live Query URL: [https://pikud-haoref-graphql-api.tuval-simha.workers.dev/graphql](https://pikud-haoref-graphql-api.tuval-simha.workers.dev/graphql)

This API is powered by [Cloudflare Workers](https://workers.cloudflare.com/) for global edge deployment with low latency.

## Example Queries

### Get alerts from today

```graphql
query AlertsToday {
    alerts(filter: { timeRange: TODAY }, first: 10) {
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
        totalCount
    }
}
```

### Get alerts from last week

```graphql
query AlertsLastWeek {
    alerts(filter: { timeRange: LAST_WEEK, orderBy: CREATED_AT_DESC }, first: 10) {
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
        totalCount
    }
}
```

### Get alerts from last month

```graphql
query AlertsLastMonth {
    alerts(filter: { timeRange: LAST_MONTH }, first: 10) {
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
        totalCount
    }
}
```

### Get alerts by custom date range

Date format: `DD/MM/YYYY`

```graphql
query AlertsByDateRange {
    alerts(filter: { dateRange: { from: "01/01/2024", to: "31/01/2024" } }, first: 10) {
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
        totalCount
    }
}
```

### Filter by category and location

```graphql
query MissileAlertsInTelAviv {
    alerts(
        filter: {
            timeRange: LAST_WEEK,
            category: MISSILES,
            location: "תל אביב"
        },
        first: 10
    ) {
        edges {
            node {
                category
                date
                location
                title
            }
        }
        totalCount
    }
}
```

## Pagination

Pagination is supported using cursor-based pagination:

- `first` - Number of items to return per page
- `after` - Cursor to start paginating from (use `endCursor` from previous response)
- `totalCount` - Returns the total number of alerts matching your filter (before pagination)

## Filtering

### Time Range

Use the `timeRange` filter for predefined ranges:
- `TODAY` - Alerts from today only
- `LAST_WEEK` - Alerts from the last 7 days
- `LAST_MONTH` - Alerts from the last 30 days

Or use `dateRange` with custom dates in `DD/MM/YYYY` format.

### Category

Filter by alert category using the `category` filter:

- `MISSILES` - Missile and rocket alerts
- `UAV_INTRUSION` - Drone intrusion
- `EARTHQUAKE` - Earthquake warning
- `RADIOLOGICAL_EVENT` - Radiological event
- `TSUNAMI` - Tsunami warning
- `HAZARDOUS_MATERIALS` - Hazardous materials incident
- `TERRORIST_INFILTRATION` - Terrorist infiltration alert

Drill categories:
- `DRILL_MISSILES`
- `DRILL_GENERAL`
- `DRILL_EARTHQUAKE`
- `DRILL_RADIOLOGICAL_EVENT`
- `DRILL_TSUNAMI`
- `DRILL_UAV_INTRUSION`
- `DRILL_HAZARDOUS_MATERIALS`
- `DRILL_TERRORIST_INFILTRATION`

### Location

Filter by location name using the `location` filter. Supports partial match and is case-insensitive.

Example: `location: "תל אביב"` or `location: "חיפה"`

### Sorting

Use `orderBy` to sort results:

- `CREATED_AT_DESC` - Newest first (default)
- `CREATED_AT_ASC` - Oldest first

## Legacy Queries (Deprecated)

The following queries are still supported for backwards compatibility but are deprecated. Use the unified `alerts` query instead.

### allAlertsFromToday

```graphql
query AllAlertsFromToday {
    allAlertsFromToday(orderBy: CREATED_AT_DESC, typeBy: MISSILES, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
        }
    }
}
```

### allAlertsFromLastWeek

```graphql
query AllAlertsFromLastWeek {
    allAlertsFromLastWeek(orderBy: CREATED_AT_DESC, typeBy: MISSILES, first: 10) {
        edges {
            node {
                category
                date
                location
                title
            }
        }
    }
}
```

### allAlertsFromLastMonth

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
        }
    }
}
```

### allAlertsByDateRange

Date format: `DD.MM.YYYY`

```graphql
query AllAlertsByDateRange {
    allAlertsByDateRange(
        dates: { fromDateTime: "01.01.2024", toDateTime: "31.01.2024" },
        first: 10
    ) {
        edges {
            node {
                category
                date
                location
                title
            }
        }
    }
}
```

## Contributing

This repository is open-source, and contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Appreciate your help in improving this project!

If you find this project helpful and would like to support its development, consider buying me a coffee:

<a href="https://www.buymeacoffee.com/tuvalsimha" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
