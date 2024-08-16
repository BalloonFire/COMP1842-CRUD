select *
from welsh_pubs;
select local_authority, count(*)
from welsh_pubs
group by local_authority
order by count(*) desc;