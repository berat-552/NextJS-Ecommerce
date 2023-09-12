export interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductParams {
  params: {
    id: string;
  };
}

export interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export interface HomeProps {
  searchParams: {
    page: string;
  };
}

export interface SearchProductParams {
  params: {
    query: string;
  };
}

export interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export interface ShoppingCartProps {
  size?: number;
}

export interface FilterElementProps {
  products: Product[];
}

export interface FilteredPageProps {
  params: {
    filterOption: string;
  };
  searchParams: {
    page: string;
  };
}
