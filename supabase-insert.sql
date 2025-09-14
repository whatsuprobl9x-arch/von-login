-- Create users table (run in Supabase SQL editor)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  role text check (role in ('admin','model')) not null,
  meta jsonb
);

-- Insert required accounts
insert into users (email, password, role) values
('admin@voncatfishers.xyz', 'T7!pZr#2LqW9@vDx', 'admin'),
('admin2@vgoncatfishers.xyz', 'gM4$Yt!Qx9V@h2Rp', 'admin'),
('kaylie@voncatfishers.xyz', 'K8^rFs!1nLz@3QwX', 'model')
on conflict (email) do update set password = excluded.password, role = excluded.role;
