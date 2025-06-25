import { Input } from "./ui/input";

export const SearchInput = ({handleSearch } : {handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <Input type="search" placeholder="search input keyword here (ex: Nike , Electronics , Japan) or (ex: Nike Electronics Japan)" onChange={handleSearch}/>
};