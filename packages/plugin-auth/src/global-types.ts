/* eslint-disable @typescript-eslint/no-unused-vars */
import { TypeParam, InputFields, FieldNullability, RootName } from '@giraphql/core';
import { PermissionCheckMap, PreResolveCheck, PermissionsCheck, GrantPermissions } from './types';
import AuthMeta from './auth-wrapper';

declare global {
  export namespace GiraphQLSchemaTypes {
    export interface FieldWrapData {
      giraphqlAuth: {
        returnTypename: string;
        fieldName: string;
        preResolveCheck?: PreResolveCheck<any>;
        permissionChecksFromType: PermissionCheckMap<any, any>;
        grantPermissions: GrantPermissions<any, any, any> | null;
        permissionCheck: PermissionsCheck<any, any, any>;
      };
    }

    export interface ResolverPluginData {
      giraphqlAuth?: AuthMeta;
    }

    export interface RootTypeOptions<Types extends TypeInfo, Type extends RootName> {
      permissions?: PermissionCheckMap<Types, Types['Root']>;
      defaultPermissionCheck?: string | string[];
    }

    export interface ObjectTypeOptions<Types extends TypeInfo, Shape> {
      preResolveCheck?: PreResolveCheck<Types>;
      permissions?: PermissionCheckMap<Types, Shape>;
      defaultPermissionCheck?: string | string[];
    }

    export interface InterfaceTypeOptions<Types extends TypeInfo, Shape> {
      permissionChecks?: PermissionCheckMap<Types, Shape>;
      defaultPermissionCheck?: string | string[];
    }

    export interface FieldOptions<
      Types extends TypeInfo,
      ParentShape,
      Type extends TypeParam<Types>,
      Nullable extends FieldNullability<Type>,
      Args extends InputFields<Types>
    > {
      // TODO add parent shape to FieldOptions
      permissionsCheck?: PermissionsCheck<Types, ParentShape, Args>;
      grantPermissions?: GrantPermissions<Types, ParentShape, Args>;
    }

    export interface InterfaceFieldOptions<
      Types extends TypeInfo,
      ParentShape,
      Type extends TypeParam<Types>,
      Nullable extends FieldNullability<Type>,
      Args extends InputFields<Types>
    > extends FieldOptions<Types, ParentShape, Type, Nullable, Args> {
      permissionsCheck?: PermissionsCheck<Types, ParentShape, Args>;
      grantPermissions?: GrantPermissions<Types, ParentShape, Args>;
    }

    export interface SubscriptionFieldOptions<
      Types extends TypeInfo,
      ParentShape,
      Type extends TypeParam<Types>,
      Nullable extends FieldNullability<Type>,
      Args extends InputFields<Types>
    > extends FieldOptions<Types, ParentShape, Type, Nullable, Args> {
      permissionsCheck?: PermissionsCheck<Types, ParentShape, Args>;
      grantPermissions?: GrantPermissions<Types, ParentShape, Args>;
    }
  }
}
