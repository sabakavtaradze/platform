export interface TopModelListItem {
    userID: number;
    fullName: string;
    userFirstName: string;
    age: number;
    totalFollowers: number;
    reviewScore: number;
    photoUrl: string;
    createdAt: string;
    // ... include other fields if needed
}

export interface TopModelFilterRangeDTO {
    minAge?: number;
    maxAge?: number;
    minFollowers?: number;
    maxFollowers?: number;
    professions?: string[];
}

export interface TopModelFilterRangeResponse {
    minAge: number;
    maxAge: number;
    minFollowers: number;
    maxFollowers: number;
    professions: string[];
}
