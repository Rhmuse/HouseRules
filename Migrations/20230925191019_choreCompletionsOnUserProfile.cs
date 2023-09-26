using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseRules.Migrations
{
    public partial class choreCompletionsOnUserProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ace4a8b9-5b7b-411e-9a36-c7c150222bf4", "AQAAAAIAAYagAAAAEGa9Hg0ZyF/Xqd0wB8d7MjqN1U9HgWepoNRdwrvrtRULDR/N+uMHQgg3w+X1KRbitA==", "a90d6940-d75c-4c13-9032-ca6c89be04dc" });

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CompletedOn",
                value: new DateTime(2023, 9, 25, 14, 10, 19, 263, DateTimeKind.Local).AddTicks(1544));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ae303f2a-6466-4abd-8a8f-7b5df76f6629", "AQAAAAIAAYagAAAAELyVcG9afNyUtqiErOiN9twqukR9hrzk1gybKwKU+LDKoy0yJvTz5iDMD60y0mJxcA==", "270e4ef7-2367-4ac1-b7fa-80bcffb5c1c9" });

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CompletedOn",
                value: new DateTime(2023, 9, 25, 13, 42, 48, 471, DateTimeKind.Local).AddTicks(2158));
        }
    }
}
