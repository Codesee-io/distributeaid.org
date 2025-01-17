import type { GatsbyNode } from 'gatsby'

import resolvers from './gatsby/create-resolvers'
import schema from './gatsby/customize-schema'
import {
  createFundraiserSchemaCustomization,
  createFundraisersFromMarkdown,
} from './gatsby/fundraisers/transformers'
import { sourceNeedsAssessments } from './gatsby/needs-assessment/sourceNeedsAssessmentData'
import {
  createPhotoResolvers,
  createPhotoSchemaCustomization,
} from './gatsby/photos/photos'
import transformers from './gatsby/transform-nodes'

/*
Customize the GraqphQL Schema
================================================================================
*/
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  (args) => {
    schema.definePageTypes(args)
    schema.defineNeedTypes(args)
    schema.defineTeamTypes(args)
    createFundraiserSchemaCustomization(args)
    createPhotoSchemaCustomization(args)
  }

/*
Source Nodes
================================================================================
*/
export const sourceNodes: GatsbyNode['sourceNodes'] = async (args) => {
  await sourceNeedsAssessments(args)
}

/*
Transform Nodes
================================================================================
*/
export const onCreateNode: GatsbyNode['onCreateNode'] = (args) => {
  transformers.createGenericPagesFromMarkdown(args)
  transformers.createRegionsFromMarkdown(args)
  transformers.createSubregionsFromMarkdown(args)
  transformers.createRoutesFromMarkdown(args)
  transformers.createTeamRolesFromMarkdown(args)
  transformers.createTeamMembersFromMarkdown(args)
  transformers.createLineItemsFromJson(args)
  createFundraisersFromMarkdown(args)
}

/*
Create Resolvers for Looking Up Related Nodes
================================================================================
*/
export const createResolvers: GatsbyNode['createResolvers'] = (args) => {
  resolvers.resolveRegionFields(args)
  resolvers.resolveSubregionFields(args)
  resolvers.resolveTeamMemberFields(args)
  createPhotoResolvers(args)
}

/*
Config
================================================================================
*/
// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
// This should really be handled by Gatsby but here we are
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions: { setBabelPlugin },
}) => {
  setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
