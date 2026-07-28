<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;


class PermissionSeeder extends Seeder
{

public function run(): void
{

$permissions=[


[
'name'=>'View Users',
'slug'=>'users.view',
'module'=>'Users'
],

[
'name'=>'Create Users',
'slug'=>'users.create',
'module'=>'Users'
],

[
'name'=>'Edit Users',
'slug'=>'users.edit',
'module'=>'Users'
],

[
'name'=>'Delete Users',
'slug'=>'users.delete',
'module'=>'Users'
],



[
'name'=>'View Pages',
'slug'=>'pages.view',
'module'=>'Pages'
],

[
'name'=>'Create Pages',
'slug'=>'pages.create',
'module'=>'Pages'
],

[
'name'=>'Edit Pages',
'slug'=>'pages.edit',
'module'=>'Pages'
],

[
'name'=>'Delete Pages',
'slug'=>'pages.delete',
'module'=>'Pages'
],


];


foreach($permissions as $permission)
{
    Permission::create($permission);
}


}

}