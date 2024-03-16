const siteLoaderModule = () => {
  $(document).ready(function () {
    $("body").addClass("loaded");
  });
};

export default siteLoaderModule;
