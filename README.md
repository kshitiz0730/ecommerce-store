# Ecommerce Store

A responsive product listing and detail application built with React and JavaScript. Product data comes from the public [DummyJSON Products API](https://dummyjson.com/docs/products).

## Features

- Responsive product listing with product images, prices, ratings, and pagination
- Product detail route at `/product/:id`
- Dynamic category filters
- Inclusive minimum and maximum price filters
- Multi-select brand filters
- Combined filters with filter state preserved in URL query parameters
- Loading, error, and empty states
- Back navigation from product details that restores the listing query

## Requirements

- Node.js and npm
- Internet connection for the DummyJSON API

## Setup

From the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Production build and local preview:

```bash
npm run build
npm run preview
```

Run the linter:

```bash
npm run lint
```

## API and pagination

Axios is configured in `src/features/products/api/productsApi.js` with the DummyJSON base URL.

The listing uses API `limit` and `skip` parameters for the all-products view and category-only view. DummyJSON does not provide price or brand filter parameters. When either of those filters is active, the app loads the selected catalog, applies the price and brand filters in the browser, then paginates the matching results locally. Category selection uses the API category endpoint.

Product routes:

- `GET /products`
- `GET /products/categories`
- `GET /products/category/:category`
- `GET /products/:id`

## URL filter state

The listing stores its state in query parameters so it can be refreshed, shared, and restored from the detail page.

Example:

```text
/?category=smartphones&min=200&max=1000&brand=Apple&page=2
```

Multiple brands are represented by repeated `brand` parameters.

## Project structure

```text
src/
  App.jsx                    # Root app component
  main.jsx                   # React entry point
  app/                       # Routes and application composition
  components/
    feedback/                # Loading, error, and empty states
    layout/                  # Shared header and page shell
  features/
    filters/
      components/            # Listing filters
      utils/                 # URL filter parsing
    products/
      api/                   # Axios requests to DummyJSON
      components/            # Product cards, grid, and pagination
      hooks/                 # Product and category data hooks
      pages/                 # Listing and detail pages
      utils/                 # Filtering and formatting helpers
  styles/
    global.css               # Tailwind CSS entry point
```

Tailwind CSS is integrated through the Vite plugin. UI styling uses Tailwind utility classes; the stylesheet in `src/styles` imports Tailwind.

## Assumptions

- Product prices are shown in USD, matching the API and supplied visual references.
- One category can be selected at a time; multiple brands can be selected.
- The minimum and maximum price bounds are inclusive.
- The listing shows eight products per page.
- Brand values are derived from products returned by the API; products without a brand are omitted from the brand filter.

## Architectural decisions

- JavaScript and JSX keep the implementation aligned with the requested stack.
- React Router handles listing and detail navigation.
- Filter and page state live in the URL rather than only in component state.
- Axios requests are isolated from UI components and receive abort signals from hooks.
- Tailwind utilities keep component styling in JSX, with one global stylesheet entry.
- Client-side filtering is limited to price and brand because DummyJSON does not expose server-side filters for those fields.

## If given more time

- Add a small backend or API proxy that filters by price and brand before applying pagination.
- Add automated tests for filtering, query-state restoration, and API error handling.
- Connect the header search field to product search.
- Add sorting and richer product gallery controls.
- Deploy the app and add the repository and demo URLs below.

## Submission links

- GitHub repository: _Add repository URL_
- Demo: _Add deployed demo URL_


