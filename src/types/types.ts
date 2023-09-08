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
