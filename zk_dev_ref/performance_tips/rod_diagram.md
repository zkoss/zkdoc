# ZK Render on Demand (ROD) - Flow Diagrams

## Initial Rendering Process

```mermaid
flowchart TD
    A[Large Dataset<br/>e.g. 10,000 records] --> B{ROD Enabled?}
    
    B -->|No| C[Traditional Rendering]
    B -->|Yes| D[ROD Process]
    
    C --> C1[Load ALL 10,000 records]
    C1 --> C2[Create ALL components in memory]
    C2 --> C3[Render ALL DOM elements]
    C3 --> C4[High Memory Usage<br/>Slow Performance]
    
    D --> D1[Check Viewport Size<br/>e.g. height=300px]
    D1 --> D2[Calculate Visible Rows<br/>e.g. only 10 rows visible]
    D2 --> D3[Load Only Required Data<br/>e.g. 100 records buffer]
    D3 --> D4[Create Only Visible Components]
    D4 --> D5[Render Only Visible DOM Elements]
    D5 --> D6[Initial Render Complete<br/>Low Memory Usage<br/>Fast Performance]
    
    subgraph Prerequisites
        P1[Use ListModel]
        P2[Set Viewport Constraint:<br/>• height<br/>• vflex<br/>• visibleRows<br/>• mold='paging']
        P3[Enable ROD Config:<br/>org.zkoss.zul.grid.rod=true]
    end
    
    subgraph Benefits
        B1[✓ Server Memory Saved]
        B2[✓ Client Memory Saved] 
        B3[✓ Faster Initial Load]
        B4[✓ Better User Experience]
    end
    
    D --> Prerequisites
    D6 --> Benefits
    
    style A fill:#e1f5fe
    style D6 fill:#c8e6c9
    style C4 fill:#ffcdd2
    style Prerequisites fill:#fff3e0
    style Benefits fill:#e8f5e8
```

## Scroll Handling Process

```mermaid
flowchart TD
    A[User Interacts with Grid] --> B{User Scrolls?}
    
    B -->|No| I[Stay Current View<br/>No Action Required]
    B -->|Yes| C[Detect Scroll Direction]
    
    C --> D[Calculate New Viewport Position]
    D --> E[Determine Required Data Range]
    E --> F{Data in Buffer?}
    
    F -->|Yes| G[Use Cached Data]
    F -->|No| H[Load Next Data Chunk<br/>from Server]
    
    G --> J[Render New Visible Rows]
    H --> J
    
    J --> K[Remove Off-screen Elements<br/>to Save Memory]
    K --> L[Update Scrollbar Position]
    L --> M[Viewport Updated]
    M --> B
    
    subgraph "Memory Management"
        MM1[Keep Small Buffer<br/>Above/Below Viewport]
        MM2[Remove Far Off-screen<br/>Elements]
        MM3[Maintain Smooth<br/>Scrolling Experience]
    end
    
    subgraph "Performance Optimizations"
        PO1[Lazy Loading]
        PO2[Virtual Scrolling]
        PO3[DOM Recycling]
        PO4[Buffer Management]
    end
    
    K --> MM1
    MM1 --> MM2
    MM2 --> MM3
    
    J --> PO1
    PO1 --> PO2
    PO2 --> PO3
    PO3 --> PO4
    
    style A fill:#e1f5fe
    style M fill:#c8e6c9
    style I fill:#f0f0f0
    style MM1 fill:#fff3e0
    style MM2 fill:#fff3e0
    style MM3 fill:#fff3e0
    style PO1 fill:#e8f5e8
    style PO2 fill:#e8f5e8
    style PO3 fill:#e8f5e8
    style PO4 fill:#e8f5e8
```

## Key Components Explained:

1. **Data Loading**: Instead of loading all 10,000 records, ROD loads only what's needed (e.g., 100 records buffer)
2. **Component Creation**: Only creates components for visible rows, not the entire dataset
3. **DOM Rendering**: Renders only visible elements in the browser
4. **Dynamic Loading**: As user scrolls, new data chunks are loaded and rendered
5. **Memory Management**: Off-screen elements are removed to save memory
