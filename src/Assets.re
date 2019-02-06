/* require an asset and return exported string value */
[@bs.val] external require: string => string = "require"; 

[@bs.deriving abstract]
type img = {
    src: string,
    srcSet: string,
    placeholder: string,
};

[@bs.val] external requireImg: string => img = "require";

/* require css file for side effect only */
[@bs.val] external requireCss: string => unit = "require";