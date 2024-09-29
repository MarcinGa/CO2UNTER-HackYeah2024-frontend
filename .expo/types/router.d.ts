/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/calculators` | `/..\components\Card` | `/_sitemap` | `/calculators` | `/convert` | `/individual` | `/parks` | `/parks/pocket-park-search` | `/parks/pocket-parks` | `/parks/town-park-search` | `/parks/town-parks` | `/services` | `/transport`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
