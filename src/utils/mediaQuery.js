import { useMediaQuery } from 'react-responsive';

function MediaQuery(){
    const isBigScreen = useMediaQuery({ query : '(min-width : 1024px)'});
    const isTablet = useMediaQuery({query : '(min-width : 768px)'});
    const isMobile = useMediaQuery({ query : '( max-width : 767px)'});

    return {isBigScreen,isTablet,isMobile};
}

export default MediaQuery;