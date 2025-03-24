import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ConfigComponent } from "./components/config/config.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, ConfigComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "anguquiz";
}
