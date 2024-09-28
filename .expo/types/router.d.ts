/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/..\components\LinkButton` | `/_sitemap` | `/convert` | `/explore` | `/individual` | `/parks` | `/parks/pocket-park-search` | `/parks/town-park-search` | `/services` | `/transport`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
