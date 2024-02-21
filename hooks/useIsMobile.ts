import {useMediaQuery, UseMediaQueryOptions} from "@mantine/hooks";

const options: UseMediaQueryOptions = {
  getInitialValueInEffect: false,
};

function useIsMobile() {
  const isMobile = useMediaQuery('(max-width: 45em)', true, options);
  const isLaptop = useMediaQuery('(max-width: 88em)', true, options);

  return {isMobile, isLaptop};
}

export {useIsMobile}