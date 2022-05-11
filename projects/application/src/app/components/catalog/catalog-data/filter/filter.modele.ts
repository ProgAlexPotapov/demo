export interface Filter {
  mainFilter: MainFilter,
  markList: string[]
}

export interface MainFilter {
  filterValue: string,
  filterName: string
}
