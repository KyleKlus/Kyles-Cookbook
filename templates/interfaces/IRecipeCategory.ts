import IRecipePost from "./IRecipePost";

export default interface IRecipeCategory {
    title: string;
    url: string;
    otherCategories: IRecipeCategory[];
    posts: IRecipePost[];
}