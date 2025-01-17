// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { ReactNode } from "react";

import CurrentUserContext, {
  CurrentUser,
  User,
} from "@foxglove/studio-base/context/CurrentUserContext";
import PlayerSelectionContext, {
  PlayerSelection,
} from "@foxglove/studio-base/context/PlayerSelectionContext";

import OpenDialog, { OpenDialogProps } from "./OpenDialog";

export default {
  title: "components/OpenDialog/Start",
  component: OpenDialog,
  parameters: { colorScheme: "dark" },
};

function fakeUser(type: "free" | "paid" | "enterprise"): User {
  return {
    id: "user-1",
    email: "user@example.com",
    orgId: "org_id",
    orgDisplayName: "Orgalorg",
    orgSlug: "org",
    orgPaid: type === "paid" || type === "enterprise",
    org: {
      id: "org_id",
      slug: "org",
      displayName: "Orgalorg",
      isEnterprise: type === "enterprise",
      allowsUploads: true,
      supportsEdgeSites: type === "enterprise",
    },
  };
}

// Connection
const playerSelection: PlayerSelection = {
  selectSource: () => {},
  selectRecent: () => {},
  recentSources: [
    {
      id: "1111",
      title: "NuScenes-v1.0-mini-scene-0655-reallllllllly-long-name-8829908290831091.bag",
    },
    {
      id: "2222",
      title: "http://localhost:11311",
      label: "ROS 1",
    },
    {
      id: "3333",
      title: "ws://localhost:9090/",
      label: "Rosbridge (ROS 1 & 2)",
    },
    {
      id: "4444",
      title: "ws://localhost:8765",
      label: "Foxglove WebSocket",
    },
    {
      id: "5555",
      title: "2369",
      label: "Velodyne Lidar",
    },
    {
      id: "6666",
      title: "THIS ITEM SHOULD BE HIDDEN IN STORYBOOKS",
      label: "!!!!!!!!!!!!",
    },
  ],
  availableSources: [
    {
      id: "foo",
      type: "connection",
      displayName: "My Data Source",
      description: "Data source description",
      iconName: "ROS",
      warning: "This is a warning",

      formConfig: {
        fields: [{ id: "key", label: "Some Label" }],
      },

      initialize: () => {
        return undefined;
      },
    },
  ],
};

function CurrentUserWrapper(props: { children: ReactNode; user?: User | undefined }): JSX.Element {
  const value: CurrentUser = {
    currentUser: props.user,
    signIn: () => undefined,
    signOut: async () => undefined,
  };
  return <CurrentUserContext.Provider value={value}>{props.children}</CurrentUserContext.Provider>;
}

const defaultProps: OpenDialogProps = { backdropAnimation: false };

export const DefaultLight = (): JSX.Element => <OpenDialog {...defaultProps} />;
DefaultLight.storyName = "Default (light)";
DefaultLight.parameters = { colorScheme: "light" };

export const DefaultDark = (): JSX.Element => <OpenDialog {...defaultProps} />;
DefaultDark.storyName = "Default (dark)";

export function UserNoAuth(): JSX.Element {
  return (
    <PlayerSelectionContext.Provider value={playerSelection}>
      <OpenDialog {...defaultProps} />
    </PlayerSelectionContext.Provider>
  );
}
UserNoAuth.storyName = "User not authenticated";

export const UserNoAuthChinese = Object.assign(UserNoAuth.bind(undefined), {
  storyName: "User not authenticated Chinese",
  parameters: { forceLanguage: "zh" },
});

export function UserPrivate(): JSX.Element {
  return (
    <CurrentUserWrapper>
      <PlayerSelectionContext.Provider value={playerSelection}>
        <OpenDialog {...defaultProps} />
      </PlayerSelectionContext.Provider>
    </CurrentUserWrapper>
  );
}
UserPrivate.storyName = "User not authenticated (private)";

export const UserPrivateChinese = Object.assign(UserPrivate.bind(undefined), {
  storyName: "User not authenticated (private) Chinese",
  parameters: { forceLanguage: "zh" },
});

export function UserAuthedFree(): JSX.Element {
  const freeUser = fakeUser("free");

  return (
    <CurrentUserWrapper user={freeUser}>
      <PlayerSelectionContext.Provider value={playerSelection}>
        <OpenDialog {...defaultProps} />
      </PlayerSelectionContext.Provider>
    </CurrentUserWrapper>
  );
}
UserAuthedFree.storyName = "User Authenticated with Free Account";

export const UserAuthedFreeChinese = Object.assign(UserAuthedFree.bind(undefined), {
  storyName: "User Authenticated with Free Account Chinese",
  parameters: { forceLanguage: "zh" },
});

export function UserAuthedPaid(): JSX.Element {
  const freeUser = fakeUser("paid");

  return (
    <CurrentUserWrapper user={freeUser}>
      <PlayerSelectionContext.Provider value={playerSelection}>
        <OpenDialog {...defaultProps} />
      </PlayerSelectionContext.Provider>
    </CurrentUserWrapper>
  );
}
UserAuthedPaid.storyName = "User Authenticated with Paid Account";

export const UserAuthedPaidChinese = Object.assign(UserAuthedPaid.bind(undefined), {
  storyName: "User Authenticated with Paid Account Chinese",
  parameters: { forceLanguage: "zh" },
});
