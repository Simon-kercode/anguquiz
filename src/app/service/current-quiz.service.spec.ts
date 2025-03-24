import { TestBed } from "@angular/core/testing";

import { CurrentQuizService } from "./current-quiz.service";

describe("CurrentQuizService", () => {
    let service: CurrentQuizService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurrentQuizService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
