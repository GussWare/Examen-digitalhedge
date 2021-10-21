const roles = ["admin"];

const roleRights = new Map();
roleRights.set(roles[0], [
	"users_list",
	"users_get_by_id",
	"users_create",
	"users_update",
	"users_delete",
	"users_patch",

	"candidatos_list",
	"candidatos_get_by_id",
	"candidatos_create",
	"candidatos_update",
	"candidatos_delete",
	"candidatos_patch",
]);

export { roles, roleRights };
