export const getDashboardRoute = (user) => {
  if (!user) return "/login";
  if (user.isAdmin) return "/admin";
  return "/dashboard";
};