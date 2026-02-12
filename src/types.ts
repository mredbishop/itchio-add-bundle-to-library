namespace AutoAdd {
  export type NullableButton = HTMLAnchorElement | null;

  export interface AutoAddState {
    bundledGames: string[];
    button: NullableButton;
  }
}
