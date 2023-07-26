export class Product {
    public ProductID: number | undefined;
    public ProductName = '';
    public Discontinued? = false;
    public UnitsInStock?: number;
    public UnitPrice = 0;
    public Category = {
        CategoryID: 0,
        CategoryName: ''
    };
}

export class Order {
    public OrderID: number | undefined;
    public CustomerID: string | undefined;
    public EmployeeID: number | undefined;
    public OrderDate: Date | undefined;
    public RequiredDate: Date | undefined;
    public ShippedDate: Date | undefined;
    public ShipVia: number | undefined;
    public Freight: number | undefined;
    public ShipName: string | undefined;;
    public ShipAddress: string | undefined;;
    public ShipCity: string | undefined;;
    public ShipRegion: string | undefined;;
    public ShipPostalCode: string | undefined;;
    public ShipCountry: string | undefined;;
}

export class Customer {
    public Id = '';
    public CompanyName = '';
    public ContactName = '';
    public ContactTitle = '';
    public Address?: string = '';
    public City = '';
    public PostalCode? = '';
    public Country? = '';
    public Phone? = '';
    public Fax? = '';
}

export class Category {
    public CategoryID?: number;
    public CategoryName?: string;
    public Description?: string;
}