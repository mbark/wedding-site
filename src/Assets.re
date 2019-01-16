/* require an asset and return exported string value */
[@bs.val] external require: string => string = "require"; 

/* require css file for side effect only */
[@bs.val] external requireCss: string => unit = "require";