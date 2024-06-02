# GreenGrid Connect Marketplace

## Problem Statement

Ireland aims to generate 70% of its electricity from renewable sources by 2030, emphasizing wind and solar power. However, data centers, which are significant electricity consumers, often seek direct connections to the gas network due to uncertainties about renewable energy availability and grid reliability. This discrepancy underscores a critical need: ensuring data centers can reliably access and verify their use of renewable energy in real time.

## Solution: GreenGrid Connect Marketplace

GreenGrid Connect Marketplace is a blockchain-based platform designed to bridge the gap between renewable energy producers and data centers. It enables real-time certification and efficient distribution of renewable energy, ensuring transparency and trust in renewable energy consumption.

## Platform Features and Functionality

### Front End
- **Home Screen (Landing Page):**
  - Overview of platform features and operations.

- **Registration:**
  - Different forms for data centers and renewable energy producers to register and log in.

- **Explore:**
  - Marketplace listing of all producer token offerings in an OpenSea-like interface.
  - Clicking on a tile opens the producer's profile.

- **Producer Profile:**
  - Displays renewable energy organization details, including tokens allocated, tokens left, tokens sold, and charts for price per token and location.

- **Consumer Profile (Data Centers):**
  - Form to report electricity produced, emissions, timestamps, and weather data, converting these to electricity tokens.
  - Transaction tables to view electricity produced, emissions, timestamps, and weather data.
  - Approval of transactions leading to digital certificates detailing both organizations' names, the number of tokens, price, and certificate ID.

- **Data Center Dashboard:**
  - Request renewable energy tokens from listed green organizations.
  - Manage wallet details, including token allocation, consumption, and pending approvals.
  - Record electricity consumption and update the wallet.

- **Certificate Validation:**
  - Verify the validity of certificates using certificate IDs.

### Token Allotment Rules and Policies
- **Token Unit:**
  - Each token represents one unit of renewable energy (kWh).

- **Conversion Factors:**
  - Wind energy: 1.2
  - Hydropower: 1.3

- **Token Issuance:**
  - Based on data center electricity use, e.g., 1000 kWh consumed with a 1.2 conversion factor results in 1200 tokens.

### Pricing and Discounts
- **Token Value:**
  - Each token represents 1 unit of electricity, priced considering the cost of generation (e.g., 0.20 euros per token for wind/hydro).

- **Discounts:**
  - 0-20% excess energy: Factor remains 1.
  - 21-40% excess energy: 5% discount, factor becomes 0.95.
  - 0-30% excess wind: No discount.
  - 31-50% excess wind: 5% discount, factor becomes 1.14.
  - 51% or higher excess wind: 10% discount, factor becomes 1.08.

### Dynamic Pricing and Real-Time Adjustments
- **Dynamic Pricing Mechanism:**
  - Token prices fluctuate based on real-time availability of renewable energy.
  - This helps data centers optimize energy use during peak generation periods.

### Backend and Blockchain Integration
- **Energy Web:**
  - Used for staking and validating transactions.
  - Provides security and governance through validators.

### Addressing Current Issues
- **Real-Time Certification:**
  - Generate certificates in real time and distribute them efficiently to consumers.
  - Enable large energy users to verify that the energy consumed was produced from renewable sources.

### Vision for the Future
- **Scalability:**
  - Implement the system across Europe and globally.
  - Encourage more businesses to consume renewable energy and reduce their carbon footprint.

## Visual Product Roadmap

### Platform Feature Release Roadmap

1. **Q3 2024**
   - Research and Development (Reach out to stakeholders)

2. **Q4 2024**
   - Release 1 (User onboarding) - 2 months
   - Agreement with group of auditors

3. **Q1 2025**
   - Release 2 (User profiles dashboards, marketplace)

4. **Q2 2025**
   - Incentivize energy providers with free memberships (Sign up providers)

5. **Q3 2025**
   - Legal Compliance sign off

6. **Q4 2025**
   - Release 3 (Monetisation)

7. **Q1 2026**
   - Onboard Data Centers

8. **Q1 2027**
   - Release 4 (AI Optimization)

This roadmap provides a clear timeline for the development and release of key features, ensuring a structured and strategic approach to building the GreenGrid Connect Marketplace.

https://green-grid-connect.vercel.app/
