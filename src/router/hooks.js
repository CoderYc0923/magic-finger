export const useCheckURL = (to, from, router) => {
    const pathList = router.getRoutes().map(route => route.path);
    if (pathList.includes(to.path)) return true;
    else return '/404'
}