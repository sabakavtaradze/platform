export interface Models {
    name: string;
    profileImg: string;
    img: string;
    age: number;
    followers: number;
    stars: number;
    profession: string;
    userID?: number;
    userProfilePic?: string;
}
export interface Category {
    category: string;
    active: boolean;
}


export interface Professions {
    professions: Profession[];
    properties: Property;
    pickedProperties: Property
}

export interface Profession {
    category: string;
    active: boolean;
}

export interface Property {
    minAge: number;
    maxAge: number;
    minFollowers: number;
    maxFollowers: number;
}