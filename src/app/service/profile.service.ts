import { Injectable, signal } from "@angular/core";
import { Profile } from "../model/profile";

@Injectable({
    providedIn: "root",
})
export class ProfileService {
    private profile = signal<Profile | undefined>(undefined);

    constructor() {}

    setProfile(profile?: Profile | null) {
        this.profile.set(profile ?? undefined);
    }

    getProfile(): Profile | undefined {
        return this.profile();
    }
}
