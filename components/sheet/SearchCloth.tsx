// function SearchCloth({ cloths }: TCloth) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const query = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams);
//       params.set(name, value);
//       return params.toString();
//     },
//     [searchParams]
//   );

//   async function handleChange(value: string) {
//     router.push(`?${query('q', value)}`);
//   }
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('');
// }

// export default SearchCloth;
