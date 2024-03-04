import React from "react";

import DetailRow from "./DetailRow";

import { Text } from "@exile-watch/writ-react";
type AbilityNameProps = {
  name?: string;
};

const AbilityName = ({ name }: AbilityNameProps) => (
  <DetailRow label="Ability" withBottomMargin>
    <Text c="sand.2">{name}</Text>
  </DetailRow>
);

export default AbilityName;
