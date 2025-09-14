-- Create users table and seed
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  role text check (role in ('admin','model')) not null,
  meta jsonb
);

insert into users (email, password, role) values
('admin@voncatfishers.xyz', 'T7!pZr#2LqW9@vDx', 'admin'),
('admin2@vgoncatfishers.xyz', 'gM4$Yt!Qx9V@h2Rp', 'admin'),
('kaylie@voncatfishers.xyz', 'K8^rFs!1nLz@3QwX', 'model')
on conflict (email) do update set password = excluded.password, role = excluded.role;

-- helper tables
create table if not exists contents (
  id uuid primary key default gen_random_uuid(),
  owner text,
  content_url text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  to_email text,
  amount numeric,
  type text,
  created_at timestamptz default now()
);

create table if not exists giftcards (
  id uuid primary key default gen_random_uuid(),
  to_email text,
  code text,
  created_at timestamptz default now()
);

create table if not exists support_messages (
  id uuid primary key default gen_random_uuid(),
  email text,
  message text,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists payout_requests (
  id uuid primary key default gen_random_uuid(),
  email text,
  requested_at timestamptz
);
